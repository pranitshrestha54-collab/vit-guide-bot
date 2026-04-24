import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Trash2, Plus, Menu, X, MessageSquare, GraduationCap, BookOpen, DollarSign, Calendar, FileText, Building2, Clock, Phone } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import vitLogo from '@/assets/vit-logo.png';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
  failed?: boolean;
}

interface Conversation {
  id: string;
  title: string;
  created_at: string;
}

const quickReplies = [
  { icon: GraduationCap, label: 'Admissions', prompt: 'Tell me about the admission process for VIT' },
  { icon: BookOpen, label: 'Courses', prompt: 'What courses and programs are offered at VIT?' },
  { icon: DollarSign, label: 'Fee Structure', prompt: 'What is the fee structure for B.Tech at VIT?' },
  { icon: Calendar, label: 'Events', prompt: 'What are the major events and festivals at VIT?' },
  { icon: FileText, label: 'Exams', prompt: 'Tell me about VITEEE exam pattern and preparation' },
  { icon: Building2, label: 'Facilities', prompt: 'What facilities are available on VIT campus?' },
  { icon: Clock, label: 'Contact Hours', prompt: 'What are the office hours and contact details?' },
  { icon: Phone, label: 'Contact Info', prompt: 'How can I contact VIT admissions office?' },
];

const ChatPage = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user, fullName, userRole, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  // Load conversations
  useEffect(() => {
    if (user) {
      loadConversations();
    }
  }, [user]);

  // Load messages when conversation changes
  useEffect(() => {
    if (currentConversation) {
      loadMessages(currentConversation);
    }
  }, [currentConversation]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadConversations = async () => {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error loading conversations:', error);
      return;
    }

    setConversations(data || []);
  };

  const loadMessages = async (conversationId: string) => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error loading messages:', error);
      return;
    }

    const typedMessages: Message[] = (data || []).map((m) => ({
      id: m.id,
      role: m.role as 'user' | 'assistant',
      content: m.content,
      created_at: m.created_at,
    }));
    setMessages(typedMessages);
  };

  const createConversation = async () => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('conversations')
      .insert({ user_id: user.id, title: 'New Conversation' })
      .select()
      .single();

    if (error) {
      console.error('Error creating conversation:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to create conversation' });
      return null;
    }

    setConversations((prev) => [data, ...prev]);
    setCurrentConversation(data.id);
    setMessages([]);
    return data.id;
  };

  const deleteConversation = async (id: string) => {
    const { error } = await supabase.from('conversations').delete().eq('id', id);

    if (error) {
      console.error('Error deleting conversation:', error);
      return;
    }

    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (currentConversation === id) {
      setCurrentConversation(null);
      setMessages([]);
    }
  };

  const saveMessage = async (conversationId: string, role: 'user' | 'assistant', content: string) => {
    const { data, error } = await supabase
      .from('messages')
      .insert({ conversation_id: conversationId, role, content })
      .select()
      .single();

    if (error) {
      console.error('Error saving message:', error);
      return null;
    }

    return data;
  };

  const updateConversationTitle = async (conversationId: string, firstMessage: string) => {
    const title = firstMessage.slice(0, 50) + (firstMessage.length > 50 ? '...' : '');
    await supabase.from('conversations').update({ title }).eq('id', conversationId);
    setConversations((prev) =>
      prev.map((c) => (c.id === conversationId ? { ...c, title } : c))
    );
  };

  const getFriendlyError = (status: number, fallback: string) => {
    switch (status) {
      case 401:
        return 'Your session has expired. Please sign in again to continue.';
      case 403:
        return "You don't have permission to use the chat. Please contact support.";
      case 429:
        return 'Too many requests. Please wait a moment and try again.';
      case 402:
        return 'The AI service is temporarily unavailable. Please try again later.';
      case 400:
        return fallback || 'Your message could not be processed. Please rephrase and try again.';
      case 500:
      case 502:
      case 503:
      case 504:
        return 'The chat service is having trouble right now. Please try again in a moment.';
      default:
        return fallback || 'Something went wrong. Please try again.';
    }
  };

  const callChatApi = async (apiMessages: { role: string; content: string }[], conversationId: string) => {
    // Try to get a valid session, refreshing if needed
    let { data: sessionData } = await supabase.auth.getSession();
    let accessToken = sessionData.session?.access_token;

    if (!accessToken) {
      const { data: refreshed, error: refreshError } = await supabase.auth.refreshSession();
      if (refreshError || !refreshed.session?.access_token) {
        const err = new Error('Your session has expired. Please sign in again.');
        (err as Error & { status?: number }).status = 401;
        throw err;
      }
      accessToken = refreshed.session.access_token;
    }

    const doFetch = (token: string) =>
      fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ messages: apiMessages, conversationId }),
      });

    let response = await doFetch(accessToken);

    // If unauthorized, try refreshing session once and retry
    if (response.status === 401) {
      const { data: refreshed, error: refreshError } = await supabase.auth.refreshSession();
      if (!refreshError && refreshed.session?.access_token) {
        response = await doFetch(refreshed.session.access_token);
      }
    }

    return response;
  };

  const sendMessage = async (messageText: string, retryOfMessageId?: string) => {
    if (!messageText.trim() || isLoading) return;

    setIsLoading(true);
    let conversationId = currentConversation;

    // Create new conversation if needed
    if (!conversationId) {
      conversationId = await createConversation();
      if (!conversationId) {
        setIsLoading(false);
        return;
      }
    }

    // Add user message (or reuse the existing one if retrying)
    let userMessage: Message;
    if (retryOfMessageId) {
      const existing = messages.find((m) => m.id === retryOfMessageId);
      userMessage = existing ?? {
        id: crypto.randomUUID(),
        role: 'user',
        content: messageText,
        created_at: new Date().toISOString(),
      };
      // Clear previous failed flag
      setMessages((prev) =>
        prev.map((m) => (m.id === userMessage.id ? { ...m, failed: false } : m))
      );
    } else {
      userMessage = {
        id: crypto.randomUUID(),
        role: 'user',
        content: messageText,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setInput('');

      // Save user message
      await saveMessage(conversationId, 'user', messageText);

      // Update title if first message
      if (messages.length === 0) {
        updateConversationTitle(conversationId, messageText);
      }
    }

    // Prepare messages for API (exclude any prior failed assistant placeholders)
    const baseMessages = retryOfMessageId
      ? messages.filter((m) => !m.failed)
      : [...messages, userMessage];
    const apiMessages = baseMessages
      .filter((m) => m.role === 'user' || (m.role === 'assistant' && m.content))
      .map((m) => ({ role: m.role, content: m.content }));

    const markUserFailed = () => {
      setMessages((prev) =>
        prev.map((m) => (m.id === userMessage.id ? { ...m, failed: true } : m))
      );
    };

    try {
      const response = await callChatApi(apiMessages, conversationId);

      if (!response.ok) {
        let serverMessage = '';
        try {
          const errorData = await response.json();
          serverMessage = errorData?.error ?? '';
        } catch {
          // ignore JSON parse errors
        }

        const friendly = getFriendlyError(response.status, serverMessage);

        if (response.status === 401) {
          toast({
            variant: 'destructive',
            title: 'Session expired',
            description: friendly,
          });
          markUserFailed();
          // Sign out and redirect so they can log in again
          await supabase.auth.signOut();
          navigate('/auth');
          return;
        }

        const err = new Error(friendly);
        (err as Error & { status?: number }).status = response.status;
        throw err;
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';
      const assistantMessageId = crypto.randomUUID();

      // Add empty assistant message
      setMessages((prev) => [
        ...prev,
        { id: assistantMessageId, role: 'assistant', content: '', created_at: new Date().toISOString() },
      ]);

      let textBuffer = '';

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMessageId ? { ...m, content: assistantContent } : m
                )
              );
            }
          } catch {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }

      if (assistantContent) {
        await saveMessage(conversationId, 'assistant', assistantContent);
      } else {
        // Stream ended without any content
        setMessages((prev) => prev.filter((m) => m.id !== assistantMessageId));
        markUserFailed();
        toast({
          variant: 'destructive',
          title: 'No response',
          description: 'The assistant did not respond. Please try again.',
        });
      }
    } catch (error) {
      console.error('Chat error:', error);
      const description =
        error instanceof Error ? error.message : 'Failed to get response. Please try again.';
      toast({
        variant: 'destructive',
        title: 'Chat error',
        description,
      });
      // Remove any empty assistant placeholder and flag the user message as failed
      setMessages((prev) =>
        prev.filter((m) => !(m.role === 'assistant' && !m.content))
      );
      markUserFailed();
    }

    setIsLoading(false);
  };

  const handleRetry = (message: Message) => {
    sendMessage(message.content, message.id);
  };

  const handleQuickReply = (prompt: string) => {
    sendMessage(prompt);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed lg:relative z-40 h-full w-72 bg-sidebar text-sidebar-foreground flex flex-col transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={vitLogo} alt="VIT" className="h-8 w-auto bg-white rounded p-0.5" />
              <span className="font-heading font-semibold">VIT Assistant</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-sidebar-foreground"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <Button
            onClick={createConversation}
            className="w-full gap-2 bg-sidebar-accent hover:bg-sidebar-accent/80"
          >
            <Plus className="h-4 w-4" />
            New Chat
          </Button>
        </div>

        {/* Conversations List */}
        <ScrollArea className="flex-1 px-2">
          <div className="space-y-1 pb-4">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className={`group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                  currentConversation === conv.id
                    ? 'bg-sidebar-accent'
                    : 'hover:bg-sidebar-accent/50'
                }`}
                onClick={() => {
                  setCurrentConversation(conv.id);
                  setIsSidebarOpen(false);
                }}
              >
                <MessageSquare className="h-4 w-4 shrink-0" />
                <span className="text-sm truncate flex-1">{conv.title}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 text-sidebar-foreground hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteConversation(conv.id);
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* User Info */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center">
              {fullName?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{fullName || 'User'}</p>
              <p className="text-xs text-sidebar-foreground/60 capitalize">{userRole}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <header className="h-16 border-b flex items-center px-4 gap-4 bg-card">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-heading font-semibold">VIT AI Assistant</h1>
            <p className="text-xs text-muted-foreground">Available 24/7 to help you</p>
          </div>
        </header>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-4">
              <img src={vitLogo} alt="VIT" className="h-16 w-auto mb-4 opacity-80" />
              <h2 className="text-2xl font-heading font-bold mb-2">Welcome to VIT Assistant!</h2>
              <p className="text-muted-foreground mb-8 max-w-md">
                I'm here to help you with information about admissions, courses, fees, 
                campus facilities, and more. How can I assist you today?
              </p>
              
              {/* Quick Replies */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-w-2xl">
                {quickReplies.map((item) => (
                  <Button
                    key={item.label}
                    variant="outline"
                    className="flex-col h-auto py-3 gap-2"
                    onClick={() => handleQuickReply(item.prompt)}
                  >
                    <item.icon className="h-5 w-5 text-primary" />
                    <span className="text-xs">{item.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] ${
                      message.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'
                    } ${message.failed ? 'opacity-60 ring-1 ring-destructive' : ''}`}
                  >
                    {message.role === 'assistant' ? (
                      <div className="prose prose-sm max-w-none dark:prose-invert">
                        <ReactMarkdown>{message.content || '...'}</ReactMarkdown>
                      </div>
                    ) : (
                      <p>{message.content}</p>
                    )}
                  </div>
                  {message.failed && message.role === 'user' && (
                    <div className="flex items-center gap-2 mt-1 text-xs text-destructive">
                      <span>Message failed to send</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs text-destructive hover:text-destructive"
                        onClick={() => handleRetry(message)}
                        disabled={isLoading}
                      >
                        Retry
                      </Button>
                    </div>
                  )}
                </div>
              ))}

              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex justify-start">
                  <div className="chat-bubble-bot flex gap-1.5 py-4">
                    <span className="w-2 h-2 rounded-full bg-primary/50 typing-dot" />
                    <span className="w-2 h-2 rounded-full bg-primary/50 typing-dot" />
                    <span className="w-2 h-2 rounded-full bg-primary/50 typing-dot" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t bg-card">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="max-w-3xl mx-auto flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about VIT..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" disabled={!input.trim() || isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
