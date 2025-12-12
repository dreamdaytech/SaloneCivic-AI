import React from 'react';
import { UserQueryLog } from '../../types';

// Mock Data
const RECENT_QUERIES: UserQueryLog[] = [
  { id: '1', query: "How do I become a citizen?", topic: "Citizenship", timestamp: "10 mins ago", sentiment: 'neutral' },
  { id: '2', query: "Can police arrest me without warrant?", topic: "Civil Rights", timestamp: "25 mins ago", sentiment: 'urgent' },
  { id: '3', query: "What is the penalty for cyberbullying?", topic: "Cyber Crime", timestamp: "1 hour ago", sentiment: 'neutral' },
  { id: '4', query: "Dual citizenship rules for USA/Sierra Leone", topic: "Citizenship", timestamp: "2 hours ago", sentiment: 'neutral' },
  { id: '5', query: "My neighbor is insulting me loudly", topic: "Public Order", timestamp: "3 hours ago", sentiment: 'frustrated' },
];

export const AnalyticsView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">User Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Most Asked Topics */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Most Asked Topics</h3>
          <div className="space-y-4">
            <TopicBar label="Citizenship & Immigration" percent={45} color="bg-blue-500" />
            <TopicBar label="Civil Rights & Police" percent={30} color="bg-green-500" />
            <TopicBar label="Cyber Crime" percent={15} color="bg-purple-500" />
            <TopicBar label="Land Disputes" percent={10} color="bg-yellow-500" />
          </div>
        </div>

        {/* User Satisfaction (Mock) */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
           <h3 className="text-lg font-bold text-gray-800 mb-4">User Sentiment</h3>
           <div className="flex items-center justify-center h-48 space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">88%</div>
                <div className="text-xs text-gray-500">Positive</div>
              </div>
              <div className="h-16 w-px bg-gray-200"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-600">12%</div>
                <div className="text-xs text-gray-500">Needs Help</div>
              </div>
           </div>
           <p className="text-xs text-center text-gray-400 mt-2">Based on analysis of last 100 interactions</p>
        </div>
      </div>

      {/* Recent Queries Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">Recent User Queries</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 font-medium">
              <tr>
                <th className="px-6 py-3">Query</th>
                <th className="px-6 py-3">Topic</th>
                <th className="px-6 py-3">Sentiment</th>
                <th className="px-6 py-3">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {RECENT_QUERIES.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 font-medium text-gray-900 truncate max-w-xs">{log.query}</td>
                  <td className="px-6 py-3">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                      {log.topic}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                       log.sentiment === 'urgent' ? 'bg-red-100 text-red-700' :
                       log.sentiment === 'frustrated' ? 'bg-orange-100 text-orange-700' :
                       'bg-gray-100 text-gray-600'
                     }`}>
                      {log.sentiment}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-400 text-xs">{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const TopicBar = ({ label, percent, color }: any) => (
  <div>
    <div className="flex justify-between text-xs font-medium mb-1">
      <span className="text-gray-700">{label}</span>
      <span className="text-gray-500">{percent}%</span>
    </div>
    <div className="w-full bg-gray-100 rounded-full h-2">
      <div className={`h-2 rounded-full ${color}`} style={{ width: `${percent}%` }}></div>
    </div>
  </div>
);