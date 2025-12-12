import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-[100dvh] bg-slate-50 relative overflow-hidden">
      {/* Decorative Background Stripes - Patriotic Colors */}
      {/* Added pointer-events-none to ensuring these never capture clicks */}
      <div className="absolute top-0 left-0 w-full h-2 bg-[#1EB53A] z-0 pointer-events-none" /> {/* Green */}
      <div className="absolute top-2 left-0 w-full h-2 bg-white z-0 pointer-events-none" />     {/* White */}
      <div className="absolute top-4 left-0 w-full h-2 bg-[#0072C6] z-0 pointer-events-none" /> {/* Blue */}

      {/* Main content z-10 ensures it sits above the stripes */}
      <main className="flex-1 flex flex-col relative pt-6 min-h-0 z-10">
        {children}
      </main>
    </div>
  );
};