import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, User, RefreshCw, Mail, Phone, Linkedin, MessageCircle, CheckCircle, ExternalLink } from 'lucide-react';
import './AIChatWidget.css';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  showContactOptions?: boolean;
}

export interface AIChatWidgetProps {
  isOpenExternal?: boolean;
  onCloseExternal?: () => void;
}

const SUGGESTED_PROMPTS = [
  "🤝 I want to connect with Shailender",
  "⚡ What are Shailender's key skills?",
  "🚀 Tell me about his AI & Web projects",
  "🎓 What degree is he pursuing?"
];

const CONNECT_CATEGORIES = [
  { label: "💼 Hiring Opportunity / Job Offer", text: "I'd like to discuss a hiring opportunity or job role." },
  { label: "🤝 Project Collaboration", text: "I'd like to collaborate on a software or AI project." },
  { label: "💬 General Inquiry", text: "I have a question regarding Shailender's work." }
];

export const AIChatWidget: React.FC<AIChatWidgetProps> = ({
  isOpenExternal,
  onCloseExternal
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnlockedContact, setHasUnlockedContact] = useState(false);

  const isOpen = isOpenExternal !== undefined ? isOpenExternal : internalOpen;

  const handleClose = () => {
    if (onCloseExternal) {
      onCloseExternal();
    } else {
      setInternalOpen(false);
    }
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: "👋 Hi there! I'm Shailender's AI Assistant. You can chat with me about his skills, projects, or text me first to unlock direct contact with him!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [isOpen, messages, isTyping]);

  const generateSmartAnswer = (query: string): { text: string; unlockContact?: boolean } => {
    const q = query.toLowerCase();

    if (q.includes('connect') || q.includes('hire') || q.includes('contact') || q.includes('reach') || q.includes('discuss') || q.includes('opportunity') || q.includes('collaboration')) {
      setHasUnlockedContact(true);
      return {
        text: `✅ **Connection Request Received!**\n\nThank you for reaching out. Your message has been noted! You can now connect with Shailender directly via WhatsApp, Email, Phone, or LinkedIn using the options below:`,
        unlockContact: true
      };
    }

    if (q.includes('skill') || q.includes('python') || q.includes('web') || q.includes('tech') || q.includes('know')) {
      return {
        text: `⚡ **Shailender's Technical Skills:**\n\n` +
          `• **Programming:** Python, JavaScript\n` +
          `• **Web Development:** HTML5, CSS3, React, Vite, Responsive Design\n` +
          `• **AI & GenAI:** Generative AI, Gemini API, OpenCV, AI Web Apps\n` +
          `• **Databases:** SQL, DBMS, Supabase\n` +
          `• **Tools:** Git, GitHub, VS Code, Power BI`
      };
    }

    if (q.includes('project') || q.includes('work') || q.includes('built') || q.includes('app') || q.includes('sahay') || q.includes('moodify') || q.includes('chatbox')) {
      return {
        text: `🚀 **Shailender's Highlighted Projects:**\n\n` +
          `1. **AI Chatbox** — Intelligent conversational AI interface (*Python, Gemini API, WebSockets*)\n` +
          `2. **Sahay** — Community assistance & emergency resource platform (*React, Node.js, Supabase*)\n` +
          `3. **Moodify** — Real-time emotion analysis & music recommender (*Python, OpenCV, Gemini API, React*)\n` +
          `4. **Personal Portfolio** — Interactive glassmorphic developer showcase (*React, Vite, TypeScript*)\n\n` +
          `You can explore full details in the **Projects** section!`
      };
    }

    if (q.includes('education') || q.includes('degree') || q.includes('college') || q.includes('study') || q.includes('graduate') || q.includes('graduation')) {
      return {
        text: `🎓 **Education:**\n\n` +
          `• **Degree:** Bachelor of Technology (B.Tech) in Computer Science\n` +
          `• **Expected Graduation:** 2027\n` +
          `• **Focus Areas:** Python Development, Web Engineering, Data Structures & Artificial Intelligence.`
      };
    }

    if (q.includes('resume') || q.includes('cv') || q.includes('download')) {
      return {
        text: `📄 You can view and download Shailender's resume using the **"Resume"** button in the hero section or side menu!`
      };
    }

    // Default response also offers connection unlock
    setHasUnlockedContact(true);
    return {
      text: `Thanks for texting! Shailender is a Computer Science student & Python Developer passionate about building useful Web & AI applications.\n\n` +
        `Direct contact options are now unlocked for you below:`,
      unlockContact: true
    };
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateSmartAnswer(text);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: reply.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        showContactOptions: reply.unlockContact
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleResetChat = () => {
    setHasUnlockedContact(false);
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'ai',
        text: "Conversation reset! Feel free to ask a question or text me to connect with Shailender.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          className="ai-widget-trigger"
          onClick={() => setInternalOpen(true)}
          aria-label="Open AI Assistant"
        >
          <div className="ai-trigger-pulse" />
          <div className="ai-trigger-icon">
            <Bot size={24} />
          </div>
          <span className="ai-trigger-text">Ask AI to Connect</span>
          <span className="ai-trigger-badge">Bot</span>
        </button>
      )}

      {/* AI Chatbot Window */}
      {isOpen && (
        <div className="ai-widget-window">
          {/* Header */}
          <div className="ai-widget-header">
            <div className="ai-header-profile">
              <div className="ai-header-avatar">
                <img src="/profile.jpg" alt="Shailender Dubey" />
                <span className="ai-status-dot" />
              </div>
              <div className="ai-header-info">
                <h3 className="ai-header-name">Shailender's AI Bot</h3>
                <span className="ai-header-sub">
                  {hasUnlockedContact ? "✅ Contact Unlocked" : "Text Bot to Connect"}
                </span>
              </div>
            </div>

            <div className="ai-header-actions">
              <button className="ai-icon-btn" onClick={handleResetChat} title="Reset Chat">
                <RefreshCw size={15} />
              </button>
              <button className="ai-icon-btn" onClick={handleClose} title="Close Chat">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="ai-widget-body">
            {messages.map((msg) => (
              <div key={msg.id} className={`ai-message-row ${msg.sender}`}>
                {msg.sender === 'ai' && (
                  <div className="ai-msg-avatar">
                    <Bot size={16} />
                  </div>
                )}
                <div className="ai-msg-bubble">
                  <div className="ai-msg-text">
                    {msg.text.split('\n').map((line, idx) => {
                      if (!line) return <br key={idx} />;
                      
                      const parts = line.split(/(\*\*.*?\*\*)/g);
                      return (
                        <p key={idx} className="ai-msg-line">
                          {parts.map((p, i) => {
                            if (p.startsWith('**') && p.endsWith('**')) {
                              return <strong key={i}>{p.slice(2, -2)}</strong>;
                            }
                            return p;
                          })}
                        </p>
                      );
                    })}
                  </div>

                  {/* Direct Contact Cards displayed inside AI message */}
                  {msg.showContactOptions && (
                    <div className="ai-contact-unlocked-card">
                      <div className="contact-unlocked-head">
                        <CheckCircle size={16} color="#10B981" />
                        <span>Direct Connection Ready</span>
                      </div>
                      
                      <div className="contact-unlocked-grid">
                        <a
                          href="https://wa.me/918707322859?text=Hi%20Shailender,%20I%20texted%20your%20portfolio%20bot%20and%20would%20like%20to%20connect!"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="contact-unlock-btn whatsapp"
                        >
                          <MessageCircle size={15} />
                          <span>WhatsApp</span>
                          <ExternalLink size={12} />
                        </a>

                        <a
                          href="mailto:shailenderdubey00@gmail.com?subject=Portfolio%20Connection%20Inquiry"
                          className="contact-unlock-btn email"
                        >
                          <Mail size={15} />
                          <span>Email Direct</span>
                        </a>

                        <a
                          href="tel:+918707322859"
                          className="contact-unlock-btn phone"
                        >
                          <Phone size={15} />
                          <span>Call Phone</span>
                        </a>

                        <a
                          href="https://www.linkedin.com/in/shailender-dubey-b12a32336"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="contact-unlock-btn linkedin"
                        >
                          <Linkedin size={15} />
                          <span>LinkedIn</span>
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  )}

                  <span className="ai-msg-time">{msg.timestamp}</span>
                </div>
                {msg.sender === 'user' && (
                  <div className="ai-user-avatar">
                    <User size={16} />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="ai-message-row ai">
                <div className="ai-msg-avatar">
                  <Bot size={16} />
                </div>
                <div className="ai-msg-bubble ai-typing">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Connect Categories / Prompts */}
          <div className="ai-widget-prompts">
            {!hasUnlockedContact && (
              <div className="connect-categories-bar">
                <span className="connect-bar-title">Quick Connect Options:</span>
                <div className="connect-bar-chips">
                  {CONNECT_CATEGORIES.map((cat, idx) => (
                    <button
                      key={idx}
                      className="connect-cat-btn"
                      onClick={() => handleSendMessage(cat.text)}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="prompts-scroll">
              {SUGGESTED_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  className="ai-prompt-chip"
                  onClick={() => handleSendMessage(prompt)}
                >
                  <Sparkles size={12} />
                  <span>{prompt}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input Footer */}
          <form
            className="ai-widget-footer"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <input
              ref={inputRef}
              type="text"
              className="ai-input"
              placeholder="Text the bot first to connect..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button type="submit" className="ai-send-btn" disabled={!inputMessage.trim()}>
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AIChatWidget;
