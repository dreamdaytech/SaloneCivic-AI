import React from 'react';
import { AVAILABLE_DOCS } from '../data/legalContext';

export const InfoPanel: React.FC = () => {
  return (
    <div className="hidden lg:flex flex-col w-80 bg-white border-l border-gray-200 h-full overflow-y-auto">
      <div className="p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-2">Knowledge Base</h2>
        <p className="text-sm text-gray-500 mb-6">
          The AI references the following official documents to answer your queries:
        </p>

        <div className="space-y-4">
          {AVAILABLE_DOCS.map((doc) => (
            <div key={doc.id} className="group p-4 rounded-xl border border-gray-100 hover:border-[#1EB53A] hover:bg-green-50/30 transition-all duration-200 cursor-default">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                  doc.category === 'constitution' ? 'bg-blue-100 text-blue-700' :
                  doc.category === 'crime' ? 'bg-red-100 text-red-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {doc.category}
                </span>
              </div>
              <h3 className="text-sm font-bold text-gray-800 mb-1 group-hover:text-[#1EB53A]">
                {doc.shortTitle}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {doc.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
          <h4 className="text-xs font-bold text-yellow-800 flex items-center mb-1">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Disclaimer
          </h4>
          <p className="text-[10px] text-yellow-700 leading-tight">
            This app provides simplified information for educational purposes. It does not constitute official legal advice. Always consult a qualified lawyer for legal representation.
          </p>
        </div>
      </div>
    </div>
  );
};
