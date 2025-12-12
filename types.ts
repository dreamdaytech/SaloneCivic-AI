export enum Role {
  USER = 'user',
  MODEL = 'model'
}

export interface ChatMessage {
  id: string;
  role: Role;
  text: string;
  timestamp: Date;
  isError?: boolean;
  action?: 'admin_login'; // Add support for interactive actions
}

export interface LegalDocument {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  category: 'constitution' | 'act' | 'crime';
}

export interface ProcessingState {
  isLoading: boolean;
  statusMessage?: string;
}

export type AdminViewType = 'overview' | 'kb' | 'analytics';

export interface AnalyticsMetric {
  label: string;
  value: string | number;
  change: string; // e.g. "+12%"
  trend: 'up' | 'down' | 'neutral';
}

export interface UserQueryLog {
  id: string;
  query: string;
  topic: string;
  timestamp: string;
  sentiment: 'neutral' | 'frustrated' | 'urgent';
}