import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Since we can't use uuid lib, we'll use a simple fallback
import { Layout } from './components/Layout';
import { Header } from './components/Header';
import { ChatBubble } from './components/ChatBubble';
import { InfoPanel } from './components/InfoPanel';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { ChatMessage, Role } from './types';
import { sendToGemini } from './services/geminiService';
import { INITIAL_KNOWLEDGE_BASE } from './data/legalContext';

// Simple ID generator fallback
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

const App: React.FC = () => {
  // Navigation State
  const [currentView, setCurrentView] = useState<'chat' | 'admin'>('chat');
  
  // Data State
  const [legalContext, setLegalContext] = useState(INITIAL_KNOWLEDGE_BASE);
  
  // Chat State
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Hidden Admin Login State
  const [adminFlowState, setAdminFlowState] = useState<'none' | 'awaiting_password'>('none');

  // Initial Greeting
  useEffect(() => {
    setMessages([
      {
        id: generateId(),
        role: Role.MODEL,
        text: "Hello! I am **SaloneCivic AI**. \n\nI can help you understand your rights and responsibilities under Sierra Leonean law, including the Constitution, Citizenship Act, and Cyber Security Act.\n\nAsk me questions like:\n* \"How do I become a citizen?\"\n* \"What are my rights if arrested?\"\n* \"Is cyberbullying a crime?\"",
        timestamp: new Date(),
      }
    ]);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');

    // Add User Message
    const userMsg: ChatMessage = {
      id: generateId(),
      role: Role.USER,
      text: userText,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);

    // --- ADMIN LOGIN FLOW INTERCEPTION ---
    
    // 1. Check for Trigger Command
    if (userText.toLowerCase() === '@salonecivicai') {
      setTimeout(() => {
        const botMsg: ChatMessage = {
          id: generateId(),
          role: Role.MODEL,
          text: "🔒 **Security Check**\n\nPlease enter the administrative password to proceed.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMsg]);
        setAdminFlowState('awaiting_password');
      }, 500);
      return;
    }

    // 2. Check for Password if in awaiting state
    if (adminFlowState === 'awaiting_password') {
      setIsLoading(true);
      // Simulate verification delay
      setTimeout(() => {
        setIsLoading(false);
        if (userText === 'Admin@CivicAISalone') {
           const botMsg: ChatMessage = {
            id: generateId(),
            role: Role.MODEL,
            text: "✅ **Credentials Verified**\n\nAccess granted to the Knowledge Base Manager. Click the link below to enter.",
            timestamp: new Date(),
            action: 'admin_login' // Triggers the button render in ChatBubble
          };
          setMessages((prev) => [...prev, botMsg]);
        } else {
           const botMsg: ChatMessage = {
            id: generateId(),
            role: Role.MODEL,
            text: "❌ **Access Denied**\n\nIncorrect credentials provided.",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, botMsg]);
        }
        setAdminFlowState('none');
      }, 800);
      return;
    }

    // --- STANDARD AI FLOW ---

    setIsLoading(true);

    try {
      // Pass the *current* legalContext to the service
      const responseText = await sendToGemini(messages, userText, legalContext);
      
      const botMsg: ChatMessage = {
        id: generateId(),
        role: Role.MODEL,
        text: responseText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);

    } catch (error) {
      const errorMsg: ChatMessage = {
        id: generateId(),
        role: Role.MODEL,
        text: "I'm having trouble connecting to the knowledge base right now. Please try again in a moment.",
        timestamp: new Date(),
        isError: true
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBubbleAction = (action: string) => {
    if (action === 'admin_login') {
      setCurrentView('admin');
    }
  };

  if (currentView === 'admin') {
    return (
      <Layout>
        <Header isAdminMode={true} />
        <AdminDashboard 
          currentContext={legalContext}
          onUpdateContext={setLegalContext}
          onLogout={() => setCurrentView('chat')}
        />
      </Layout>
    );
  }

  // Default Chat View
  return (
    <Layout>
      <Header />
      
      <div className="flex flex-1 overflow-hidden min-h-0 relative">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-[#F3F6F8] min-h-0">
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 scroll-smooth">
            <div className="max-w-3xl mx-auto">
              {messages.map((msg) => (
                <ChatBubble 
                  key={msg.id} 
                  message={msg} 
                  onAction={handleBubbleAction}
                />
              ))}
              
              {isLoading && (
                <div className="flex justify-start w-full mb-6">
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none px-5 py-4 shadow-sm flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#1EB53A] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-[#0072C6] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200 shrink-0">
            <div className="max-w-3xl mx-auto">
              <form 
                onSubmit={handleSend}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about your rights, laws, or constitution..."
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-full focus:ring-[#1EB53A] focus:border-[#1EB53A] block pl-5 pr-14 py-3 shadow-sm transition-all outline-none"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className={`absolute right-2 p-2 rounded-full transition-colors ${
                    !input.trim() || isLoading 
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                      : 'bg-[#1EB53A] text-white hover:bg-green-700'
                  }`}
                >
                  <svg className="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
              <div className="text-center mt-3 px-2">
                <p className="text-[10px] text-gray-400 leading-normal">
                  Disclaimer: SaloneCivic AI may provide inaccurate information. This is not legal advice. 
                  <br className="hidden sm:inline" /> Please consult a qualified legal professional for official guidance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Panel (Desktop) */}
        <InfoPanel />
      </div>
    </Layout>
  );
};

export default App;