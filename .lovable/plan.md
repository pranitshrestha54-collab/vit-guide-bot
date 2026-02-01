

# VIT College AI Chatbot - Project Plan

## Project Overview
A professional AI-powered chatbot system for Vellore Institute of Technology (VIT) that provides 24×7 automated assistance to students, faculty, and visitors. The system features a complete college website with an integrated intelligent chatbot.

---

## 1. Landing Page & College Website

### Homepage
- **Hero Section** with VIT branding (official blue/white theme with the VIT logo)
- Quick access cards for: Admissions, Courses, Fee Structure, Campus Life
- Featured announcements and upcoming events section
- Statistics showcase (student count, courses, placements, etc.)

### Navigation Pages
- **About VIT**: University history, vision, mission, leadership
- **Academics**: Departments, courses, faculty information
- **Admissions**: Eligibility, application process, important dates
- **Campus Life**: Facilities, hostels, sports, clubs
- **Contact**: Campus address, phone, email, map

---

## 2. User Authentication System

### Login/Signup Page
- Email and password authentication
- User role selection: **Student**, **Faculty**, or **Visitor**
- Password recovery functionality
- Secure session management

### User Profiles
- Profile management with name, email, and role
- Conversation history linked to user accounts
- Personalized greeting based on user role

---

## 3. AI Chatbot Interface

### Chat Window Design
- **VIT-branded chat header** with logo and title
- Clean message bubbles (user messages on right, bot on left)
- **Real-time streaming responses** - shows AI "typing" effect
- Timestamp for each message
- Mobile-responsive floating chat button

### Quick Reply Buttons
Pre-defined buttons for common queries:
- 🎓 Admissions
- 📚 Courses & Departments
- 💰 Fee Structure
- 🎉 Events & Announcements
- 📝 Examination Results
- 🏫 Campus Facilities
- ⏰ Contact Hours
- 📞 Contact Information

### Conversation Features
- Markdown-formatted AI responses (headings, lists, bold text)
- Conversation history saved per user
- Clear chat option
- Export conversation feature

---

## 4. Knowledge Base Management (Admin Panel)

### FAQ Management Dashboard
- Add, edit, and delete FAQ entries
- Categorize FAQs (Admissions, Courses, Fees, etc.)
- Search and filter FAQs
- Bulk import/export functionality

### Data Categories
- **Admissions**: Application process, eligibility, deadlines, required documents
- **Courses**: B.Tech, M.Tech, PhD programs, specializations
- **Fee Structure**: Tuition, hostel, other fees by program
- **Events**: Academic calendar, festivals, placement drives
- **Facilities**: Libraries, labs, hostels, sports, medical center
- **Exam Information**: Schedule, results, revaluation process

### Analytics Dashboard (Bonus)
- Most asked questions
- User engagement metrics
- Response quality feedback

---

## 5. AI Capabilities

### Natural Language Understanding
- Powered by **Lovable AI** (Google Gemini model)
- Context-aware conversations (remembers previous messages)
- Intent detection for query categorization
- Handles variations in user phrasing

### Response Generation
- Accurate, VIT-specific information from knowledge base
- Friendly, helpful tone appropriate for academic setting
- Links to relevant pages when applicable
- Fallback to general assistance for unknown queries

---

## 6. Technical Architecture

### Frontend (React + TypeScript)
- Modern, component-based architecture
- Tailwind CSS for VIT-themed styling
- Responsive design (desktop + mobile)
- Real-time updates with React Query

### Backend (Supabase + Edge Functions)
- **Database Tables**:
  - `profiles` - User information and roles
  - `conversations` - Chat sessions
  - `messages` - Individual chat messages
  - `faqs` - Knowledge base entries
  - `user_roles` - Role-based access control
- **Edge Functions**:
  - `chat` - AI-powered response generation
  - Secure API communication

### Security
- Row-Level Security (RLS) on all tables
- JWT-based authentication
- Input validation with Zod
- Secure secret management

---

## 7. Academic Documentation (for Viva)

### Diagrams to Include
- System Architecture Diagram
- Use Case Diagram
- ER Diagram (Database Schema)
- Flowchart (User interaction flow)
- Sequence Diagram (Chat request/response)

### Report Sections
- Abstract & Problem Statement
- Objectives & Scope
- Literature Review (NLP, Chatbots)
- Methodology (Agile Development)
- System Design & Architecture
- Implementation Details
- Testing & Results
- Advantages & Applications
- Future Scope (Voice input, multilingual support)
- Conclusion

---

## Design Theme

| Element | Specification |
|---------|--------------|
| Primary Color | VIT Blue (#2c3e86) |
| Secondary Color | White (#ffffff) |
| Accent Color | Gold (#d4af37) |
| Font | Clean, professional sans-serif |
| Logo | VIT official logo on all pages |

---

## Deliverables Summary

✅ Complete VIT-branded college website  
✅ AI chatbot with streaming responses  
✅ User authentication (Student/Faculty/Visitor)  
✅ Admin panel for knowledge base management  
✅ Conversation history per user  
✅ Quick reply buttons for common queries  
✅ Mobile-responsive design  
✅ Database with proper security  
✅ Production-ready deployment

