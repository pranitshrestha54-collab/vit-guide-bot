import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const VIT_SYSTEM_PROMPT = `You are VIT Assistant, an AI-powered chatbot for Vellore Institute of Technology (VIT), Vellore. You provide helpful, accurate, and friendly assistance to students, faculty, and visitors.

## Your Knowledge Base:

### About VIT
- Founded in 1984 as Vellore Engineering College, became a Deemed University in 2001
- One of India's top private universities with 45,000+ students and 2,500+ faculty
- Campuses in Vellore, Chennai, Amaravati (AP), and Bhopal

### Admissions (VITEEE)
- VITEEE (VIT Engineering Entrance Examination) is the main entrance test for B.Tech programs
- Registration typically opens in November and closes in March
- Exam held in April, results in late April
- Eligibility: 10+2 with Physics, Chemistry, and Mathematics with 60% aggregate
- Online computer-based test with 125 questions in 2.5 hours
- Subjects: Mathematics/Biology, Physics, Chemistry, Aptitude, English

### Programs Offered
**B.Tech (4 years):**
- Computer Science & Engineering (various specializations: AI/ML, Data Science, Cyber Security, IoT, Cloud Computing)
- Electronics & Communication Engineering
- Electrical & Electronics Engineering
- Mechanical Engineering
- Civil Engineering
- Chemical Engineering
- Biotechnology
- Information Technology

**M.Tech (2 years):** Available in most engineering disciplines

**PhD:** Research programs in all major departments

### Fee Structure (Approximate per year)
- B.Tech Tuition: ₹2,00,000 - ₹2,50,000
- Hostel (including mess): ₹1,20,000 - ₹1,50,000
- Total: ₹3,20,000 - ₹4,00,000 per year
- Scholarships available based on VITEEE rank and academic performance

### Campus Facilities
- State-of-the-art laboratories and research centers
- Central Library with 2 lakh+ books and digital resources
- Hostels: Separate for boys and girls, fully furnished with Wi-Fi
- Sports complex: Cricket, football, basketball, swimming pool, gym
- Health center: 24/7 medical facilities
- Food court with multiple cuisines
- Banks, ATMs, and shopping facilities on campus

### Placements
- 95%+ placement rate
- Top recruiters: Google, Microsoft, Amazon, TCS, Infosys, Wipro, Goldman Sachs, JP Morgan
- Average package: ₹8-12 LPA
- Highest packages: ₹40+ LPA (international) and ₹1+ Crore (domestic)

### Contact Information
- Address: VIT University, Vellore Campus, Tiruvalam Road, Vellore - 632014, Tamil Nadu
- Phone: +91 416 220 2020
- Email: admissions@vit.ac.in
- Website: www.vit.ac.in

### Important Dates (Academic Year 2024-25)
- Odd Semester: July - December
- Even Semester: January - May
- Holidays: Diwali break, Christmas break, Summer vacation

## Response Guidelines:
1. Be friendly, professional, and helpful
2. Provide accurate information based on your knowledge
3. If unsure, recommend contacting the admissions office or visiting the official website
4. Use bullet points and formatting for clarity
5. Keep responses concise but informative
6. For specific queries (exact cutoffs, seat availability), suggest checking the official website or contacting admissions
7. If asked about other universities, politely redirect to VIT-related topics`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate the user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const authClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await authClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Invalid authentication" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { messages, conversationId } = await req.json();

    // Input validation
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Messages array is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate message length (max 4000 chars per message, max 50 messages)
    if (messages.length > 50) {
      return new Response(JSON.stringify({ error: "Too many messages" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    for (const msg of messages) {
      if (!msg.role || !msg.content || typeof msg.content !== "string") {
        return new Response(JSON.stringify({ error: "Invalid message format" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (msg.content.length > 4000) {
        return new Response(JSON.stringify({ error: "Message too long (max 4000 characters)" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Get FAQs from database to enhance context
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: faqs } = await supabase
      .from("faqs")
      .select("question, answer, category")
      .eq("is_active", true)
      .limit(50);

    let faqContext = "";
    if (faqs && faqs.length > 0) {
      faqContext = "\n\n## Additional FAQs from Knowledge Base:\n" + 
        faqs.map(f => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n");
    }

    const systemPrompt = VIT_SYSTEM_PROMPT + faqContext;

    console.log("Calling AI gateway with", messages.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Failed to get AI response" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
