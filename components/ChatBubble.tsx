import React from 'react';
import { ChatMessage, Role } from '../types';

interface ChatBubbleProps {
  message: ChatMessage;
  onAction?: (actionType: string) => void;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message, onAction }) => {
  const isUser = message.role === Role.USER;

  // Function to bold citations (simple parser)
  const renderText = (text: string) => {
    // Split by bold markers provided by Gemini (Markdown style **)
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-bold text-slate-900 bg-yellow-50 px-1 rounded">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`relative max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-4 shadow-sm text-sm sm:text-base leading-relaxed ${
          isUser
            ? 'bg-[#0072C6] text-white rounded-br-none'
            : 'bg-white border border-gray-100 text-gray-700 rounded-bl-none'
        }`}
      >
        {!isUser && (
          <div className="absolute -top-6 left-0 flex items-center space-x-2">
            <div className="w-5 h-5 bg-[#1EB53A] rounded-full flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">AI</span>
            </div>
            <span className="text-xs text-gray-400 font-medium">SaloneCivic AI</span>
          </div>
        )}
        
        <div className="whitespace-pre-wrap">
          {renderText(message.text)}
        </div>

        {/* Action Button for Admin Login */}
        {message.action === 'admin_login' && onAction && (
          <div className="mt-4 pt-3 border-t border-gray-100">
            <button
              onClick={() => onAction('admin_login')}
              className="group flex items-center space-x-2 px-4 py-2 bg-[#0072C6] text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg w-full sm:w-auto justify-center"
            >
              <span>Access Admin Dashboard</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        )}

        <span className={`text-[10px] block mt-2 opacity-70 ${isUser ? 'text-blue-100 text-right' : 'text-gray-400'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};