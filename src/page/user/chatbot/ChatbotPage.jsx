import { useState, useEffect, useRef } from 'react';
import ChatInterface from './components/ChatInterface';
import HeroSection from './components/HeroSection';
import { formatMessage } from './components/MessageFormatter';
import SEOHead from '../../../components/SEOHead';

export default function ChatbotPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Initialize with welcome message
    setMessages([
      {
        role: 'assistant',
        content: `👋 Hello! I'm your ScholarLink Assistant. I can help you discover scholarships tailored to your interests and qualifications. 

Let me know what you're looking for:
• Your field of study
• Preferred country
• Degree level (Bachelors, Masters, PhD)
• Any specific requirements

I'll help find the perfect opportunities for you! 🎓`,
      },
    ]);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/chat-scholarship', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages([...newMessages, { 
        role: 'assistant', 
        content: '❌ Sorry, I encountered an error connecting to the scholarship database. Please try again later or contact support if the problem persists.' 
      }]);    } finally {
      setLoading(false);
    }
  };
  const clearChat = () => {
    setMessages([{
      role: 'assistant',
      content: '👋 Hello! I\'m your ScholarLink Assistant. What kind of scholarship are you looking for? 🎓',
    }]);  };
  return (
    <>
      {/* SEO Head Component */}
      <SEOHead
        title="AI Scholarship Assistant - Get Personalized Recommendations"
        description="Get personalized scholarship recommendations, application guidance, and answers to all your scholarship-related questions with our AI assistant."
        keywords="AI scholarship assistant, scholarship chatbot, personalized scholarship recommendations, scholarship guidance, education AI"
        url="/chatbot"
        type="website"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-[#f1f5f9] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroSection />
        <ChatInterface 
          messages={messages}
          loading={loading}
          input={input}
          setInput={setInput}
          onSendMessage={sendMessage}
          onClearChat={clearChat}
          formatMessage={formatMessage}
          ref={chatEndRef}
        />
      </div>
      
      <style>{`
        .message-fade-in {
          animation: messageIn 0.3s ease-out;
        }

        @keyframes messageIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #D1D5DB #F3F4F6;
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: #F3F4F6;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #D1D5DB;
          border-radius: 3px;
        }        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background-color: #9CA3AF;
        }
      `}</style>
    </div>
    </>
  );
}
