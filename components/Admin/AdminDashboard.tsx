import React, { useState } from 'react';
import { AdminViewType } from '../../types';
import { KnowledgeBaseView } from './KnowledgeBaseView';
import { AnalyticsView } from './AnalyticsView';

interface AdminDashboardProps {
  currentContext: string;
  onUpdateContext: (newContext: string) => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  currentContext, 
  onUpdateContext,
  onLogout
}) => {
  const [activeView, setActiveView] = useState<AdminViewType>('overview');

  const MenuButton = ({ view, icon, label }: { view: AdminViewType, icon: any, label: string }) => (
    <button
      onClick={() => setActiveView(view)}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
        activeView === view 
          ? 'bg-[#0072C6] text-white' 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <div className="flex flex-1 overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full shadow-sm z-10">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
          <p className="text-xs text-gray-400">SaloneCivic AI Manager</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <MenuButton 
            view="overview" 
            label="Overview"
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>} 
          />
          <MenuButton 
            view="kb" 
            label="Knowledge Base"
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>} 
          />
          <MenuButton 
            view="analytics" 
            label="Analytics"
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>} 
          />
        </nav>

        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <button 
            onClick={onLogout}
            className="flex items-center space-x-2 text-red-600 hover:text-red-700 text-sm font-medium w-full px-4 py-2 hover:bg-red-50 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8 bg-slate-50">
        {activeView === 'overview' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">System Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard label="Total Interactions" value="1,284" change="+12%" />
              <StatCard label="Knowledge Docs" value="4" change="0" />
              <StatCard label="Avg. Response Time" value="1.2s" change="-0.1s" />
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mt-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">System Status</h3>
              <div className="flex items-center space-x-2 text-sm text-green-700 bg-green-50 px-3 py-2 rounded-md w-fit">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span>Gemini API Operational</span>
              </div>
            </div>
          </div>
        )}

        {activeView === 'kb' && (
          <KnowledgeBaseView 
            currentContext={currentContext} 
            onUpdateContext={onUpdateContext} 
          />
        )}

        {activeView === 'analytics' && <AnalyticsView />}
      </div>
    </div>
  );
};

const StatCard = ({ label, value, change }: any) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
    <p className="text-sm text-gray-500 font-medium mb-1">{label}</p>
    <div className="flex items-end justify-between">
      <span className="text-3xl font-bold text-gray-900">{value}</span>
      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
        change.includes('+') ? 'bg-green-100 text-green-700' : 
        change === '0' ? 'bg-gray-100 text-gray-600' : 'bg-red-100 text-red-700'
      }`}>
        {change}
      </span>
    </div>
  </div>
);