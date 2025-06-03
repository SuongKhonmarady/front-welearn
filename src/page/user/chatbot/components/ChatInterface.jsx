import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const ChatInterface = forwardRef(({ 
  messages, 
  loading, 
  input, 
  setInput, 
  onSendMessage, 
  onClearChat, 
  formatMessage 
}, chatEndRef) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
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
              onClick={onClearChat}
              title="Clear chat"
            >
              <svg className="w-5 h-5 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="h-[600px] overflow-y-auto scrollbar-thin">
          <div className="flex flex-col space-y-6 p-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start message-fade-in ${
                  message.role === 'assistant' ? 'bg-[#f8fafc]' : ''
                } -mx-6 p-6 ${message.role === 'assistant' ? 'border-y border-gray-100' : ''}`}
              >
                <div className={`flex-1 max-w-none mx-auto flex ${message.role === 'user' ? 'justify-end' : 'items-start'} gap-4`}>
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
              onSendMessage();
            }}
            className="relative max-w-none mx-auto bg-white rounded-xl shadow-sm border border-gray-200 focus-within:border-[#283d50] focus-within:ring-1 focus-within:ring-[#283d50] transition-all duration-200"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about scholarships..."
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
    </div>
  );
});

ChatInterface.displayName = 'ChatInterface';

ChatInterface.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      role: PropTypes.oneOf(['user', 'assistant']).isRequired,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  input: PropTypes.string.isRequired,
  setInput: PropTypes.func.isRequired,
  onSendMessage: PropTypes.func.isRequired,
  onClearChat: PropTypes.func.isRequired,
  formatMessage: PropTypes.func.isRequired,
};

export default ChatInterface;
