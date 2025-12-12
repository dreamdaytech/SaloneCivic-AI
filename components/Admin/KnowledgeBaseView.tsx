import React, { useState, useRef } from 'react';

interface KnowledgeBaseViewProps {
  currentContext: string;
  onUpdateContext: (val: string) => void;
}

export const KnowledgeBaseView: React.FC<KnowledgeBaseViewProps> = ({ currentContext, onUpdateContext }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localContext, setLocalContext] = useState(currentContext);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    onUpdateContext(localContext);
    setIsEditing(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadStatus('uploading');

    // Simulate network delay
    setTimeout(() => {
      // If it's a text file, we can actually read it
      if (file.type === 'text/plain') {
        const reader = new FileReader();
        reader.onload = (event) => {
          const text = event.target?.result as string;
          const newDocEntry = `\n\n--- DOCUMENT (UPLOADED): ${file.name} ---\n${text}\n`;
          setLocalContext(prev => prev + newDocEntry);
          setUploadStatus('success');
          // Auto-clear success message after 3s
          setTimeout(() => setUploadStatus('idle'), 3000);
        };
        reader.readAsText(file);
      } else {
        // For PDF/Docx, since this is a frontend-only demo, we simulate the OCR process
        const mockContent = `\n\n--- DOCUMENT (PARSED): ${file.name} ---\n[Content parsed from binary file would appear here. In this demo, we are simulating the extraction of text from ${file.name}.]\n`;
        setLocalContext(prev => prev + mockContent);
        setUploadStatus('success');
        setTimeout(() => setUploadStatus('idle'), 3000);
      }
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Knowledge Base Manager</h1>
        <div className="space-x-2">
          {isEditing ? (
            <>
              <button 
                onClick={() => {
                  setLocalContext(currentContext); // Reset
                  setIsEditing(false);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-[#1EB53A] rounded-lg hover:bg-green-700"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-[#0072C6] rounded-lg hover:bg-blue-700"
            >
              Edit Context Manually
            </button>
          )}
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-2">Upload New Documents</h3>
        <p className="text-sm text-gray-500 mb-4">Supported formats: .txt, .pdf, .docx (Max 10MB)</p>
        
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-[#0072C6] hover:bg-blue-50 transition-colors"
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            className="hidden" 
            accept=".txt,.pdf,.docx"
          />
          <svg className="w-10 h-10 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-sm font-medium text-gray-900">Click to upload or drag and drop</p>
          <p className="text-xs text-gray-500 mt-1">PDF, DOCX, or TXT</p>
        </div>

        {uploadStatus === 'uploading' && (
          <div className="mt-4 flex items-center space-x-2 text-sm text-[#0072C6]">
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Processing document...</span>
          </div>
        )}

        {uploadStatus === 'success' && (
          <div className="mt-4 p-3 bg-green-50 text-green-700 text-sm rounded-lg flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            Document processed and appended to Context successfully!
          </div>
        )}
      </div>

      {/* Context Editor */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-[500px]">
        <div className="p-4 border-b border-gray-100 bg-gray-50 rounded-t-xl">
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">System Prompt & Context</h3>
        </div>
        <textarea
          value={localContext}
          onChange={(e) => setLocalContext(e.target.value)}
          disabled={!isEditing}
          className={`flex-1 p-4 font-mono text-sm leading-relaxed outline-none resize-none ${
            isEditing ? 'bg-white text-gray-800' : 'bg-gray-50 text-gray-500 cursor-not-allowed'
          }`}
          spellCheck={false}
        />
      </div>
    </div>
  );
};