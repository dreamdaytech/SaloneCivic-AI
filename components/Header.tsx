import React from 'react';

interface HeaderProps {
  isAdminMode?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isAdminMode = false }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4 flex items-center shadow-sm z-50 sticky top-0">
      <div className="flex items-center space-x-3">
        {/* Abstract Flag Icon */}
        <div className="flex flex-col h-8 w-10 shadow-sm rounded overflow-hidden">
          <div className="h-1/3 bg-[#1EB53A]"></div>
          <div className="h-1/3 bg-white"></div>
          <div className="h-1/3 bg-[#0072C6]"></div>
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">
            Salone<span className="text-[#0072C6]">Civic AI</span>
          </h1>
          <p className="text-[10px] sm:text-xs text-gray-500 font-medium">Your Rights. Your Laws. Your Salone.</p>
        </div>
      </div>
      
      <div className="ml-auto flex items-center space-x-3">
        {/* Admin button removed in favor of chat-based command (@SaloneCivicAI) */}
        
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 select-none">
          Beta 1.0
        </span>
      </div>
    </header>
  );
};