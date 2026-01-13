export interface Prospect {
  id: string;
  name: string;
  company: string;
  role: string;
  phone: string;
  lastCallOutcome: string;
  stage: 'MQL' | 'SQL';
  objective: string;
  previousNotes: string[];
  aiContextReminder: string;
}

export type EmotionalState = 'Comfortable' | 'Neutral' | 'Stressed';

export interface CallSession {
  startTime: Date;
  duration: number;
  emotionalStates: { time: number; state: EmotionalState }[];
  coachingSuggestions: string[];
}

export interface CallDisposition {
  type: 'didnt_connect' | 'reschedule' | 'not_interested' | 'dnd' | 'wrong_number' | 'conversation_review';
  details?: string;
  rescheduleDate?: Date;
  stage?: 'MQL' | 'SQL';
  notes?: string;
}

export interface DayReport {
  date: Date;
  totalTalkTime: number;
  emotionalEngagement: {
    comfortable: number;
    neutral: number;
    stressed: number;
  };
  talkRatio: {
    agent: number;
    prospect: number;
  };
  aiFeedback: string;
  improvementSuggestions: string[];
}
