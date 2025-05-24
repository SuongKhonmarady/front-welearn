import { useState, useEffect, useRef } from 'react';

export default function ScholarshipChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (open && messages.length === 0) {
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
    }
  }, [open, messages.length]);

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
      const response = await fetch('http://api-scholar.site/api/chat-scholarship', {
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
      }]);
    } finally {
      setLoading(false);
    }
  };

  const formatMessage = (content) => {
    // Handle section formatting with 'u' flag for Unicode support
    const sections = content.split(/\n\n(?=[🎯|💫|💡|🤝])/u);
    
    if (sections.length > 1) {
      return (
        <div className="space-y-6">
          {sections.map((section, index) => {
            const [title, ...content] = section.split('\n');
            
            // Special formatting for scholarship recommendations section
            if (title.includes('💫 Top Recommendations:')) {
              const scholarships = content.join('\n').split(/•\s🎓/).filter(Boolean);
              return (
                <div key={index} className="recommendation-section">
                  <h3 className="font-semibold text-[#283d50] mb-4">{title}</h3>
                  {scholarships.map((scholarship, schIndex) => (
                    <div 
                      key={schIndex} 
                      className="bg-[#f8fafc] rounded-lg p-4 border border-gray-100 hover:border-[#283d50] transition-colors duration-200 mb-4"
                    >
                      {scholarship.split('\n').map((line, lineIndex) => {
                        if (line.includes('🔗 Next Steps:')) {
                          const linkMatch = line.match(/\bhttps?:\/\/\S+/gi);
                          return (
                            <p key={lineIndex} className="mt-2">
                              <span className="font-medium">Next Steps: </span>
                              {linkMatch ? (
                                <a 
                                  href={linkMatch[0]}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline"
                                >
                                  Apply Here
                                </a>
                              ) : line}
                            </p>
                          );
                        }
                        return (
                          <p 
                            key={lineIndex} 
                            className={`${lineIndex === 0 ? 'font-medium text-[#283d50]' : 'text-gray-600'} ${lineIndex > 0 ? 'mt-1' : ''}`}
                          >
                            {line}
                          </p>
                        );
                      })}
                    </div>
                  ))}
                </div>
              );
            }
            
            return (
              <div key={index} className="message-section">
                <h3 className="font-semibold text-[#283d50] mb-2">{title}</h3>
                <div className="text-gray-600">
                  {content.map((line, lineIndex) => (
                    <p key={lineIndex} className="mt-1">
                      {line.trim()}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    // Regular message formatting for non-structured content
    return <p className="text-gray-700 whitespace-pre-wrap">{content}</p>;
  };

  return (
    <div className="relative">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="group w-full py-6 px-8 bg-white hover:bg-[#f8fafc] rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200 flex items-center justify-center gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#283d50] to-[#1e2d3d] rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl">🤖</span>
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-[#283d50]">Scholarship Assistant</h3>
              <p className="text-sm text-gray-600">Ask me about scholarships</p>
            </div>
          </div>
          <div className="ml-auto flex items-center">
            <span className="text-sm text-gray-400 mr-2 group-hover:text-[#283d50]">Start chat</span>
            <div className="w-8 h-8 bg-[#f8fafc] rounded-full flex items-center justify-center group-hover:bg-[#e5e9f0] transition-colors duration-300">
              <svg className="w-4 h-4 text-[#283d50] transform group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </button>
      ) : (
        <div className="relative h-[600px] bg-white rounded-xl shadow-xl flex flex-col border border-gray-200 overflow-hidden">
          {/* Chat Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#283d50] border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-[#f8fafc] to-white rounded-full flex items-center justify-center shadow-md">
                  <span className="text-xl">🤖</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <h3 className="font-semibold text-white">Scholarship Assistant</h3>
                <p className="text-xs text-gray-200">Always online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                className="p-2 hover:bg-[#1e2d3d] rounded-lg transition-colors duration-200"
                onClick={() => {
                  setMessages([]);
                  setMessages([{
                    role: 'assistant',
                    content: '👋 Hello! I\'m your Scholarship Assistant. What kind of scholarship are you looking for? 🎓',
                  }]);
                }}
                title="Clear chat"
              >
                <svg className="w-5 h-5 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <button 
                onClick={() => setOpen(false)}
                className="p-2 hover:bg-[#1e2d3d] rounded-lg transition-colors duration-200"
                title="Close chat"
              >
                <svg className="w-5 h-5 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            <div className="flex flex-col space-y-6 p-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start message-fade-in ${
                    message.role === 'assistant' ? 'bg-[#f8fafc]' : ''
                  } -mx-6 p-6 ${message.role === 'assistant' ? 'border-y border-gray-100' : ''}`}
                >
                  <div className={`flex-1 max-w-3xl mx-auto flex ${message.role === 'user' ? 'justify-end' : 'items-start'} gap-4`}>
                    {message.role === 'assistant' && (
                      <div className="flex-shrink-0">
                        <div className="w-9 h-9 bg-gradient-to-br from-[#283d50] to-[#1e2d3d] rounded-full flex items-center justify-center shadow-md">
                          <span className="text-lg text-white">🤖</span>
                        </div>
                      </div>
                    )}
                    <div className={`flex-grow ${message.role === 'user' ? 'text-right' : ''} prose prose-sm max-w-none`}>
                      {formatMessage(message.content)}
                    </div>
                    {message.role === 'user' && (
                      <div className="flex-shrink-0">
                        <div className="w-9 h-9 bg-gradient-to-br from-[#283d50] to-[#1e2d3d] rounded-full flex items-center justify-center shadow-md">
                          <span className="text-white">👤</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-4 p-6 message-fade-in">
                  <div className="w-9 h-9 bg-gradient-to-br from-[#283d50] to-[#1e2d3d] rounded-full flex items-center justify-center shadow-md">
                    <span className="text-lg text-white">🤖</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-[#283d50] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-[#283d50] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-[#283d50] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 bg-white p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="relative max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 focus-within:border-[#283d50] focus-within:ring-1 focus-within:ring-[#283d50] transition-all duration-200"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message Scholarship Assistant..."
                className="w-full px-4 py-3 pr-16 rounded-xl bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
                disabled={loading}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="p-2 rounded-lg bg-[#283d50] hover:bg-[#1e2d3d] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#283d50] transition-all duration-200 group"
                >
                  <svg 
                    className="w-5 h-5 text-white transform group-hover:translate-x-0.5 transition-transform duration-200" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </div>
            </form>
            <div className="mt-2 text-center">
              <p className="text-xs text-gray-400">Press Enter to send your message</p>
            </div>
          </div>
        </div>
      )}

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

        .scholarship-item {
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-8px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Custom Scrollbar */
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
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background-color: #9CA3AF;
        }
      `}</style>
    </div>
  );
}
