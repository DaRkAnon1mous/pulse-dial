import { Prospect, DayReport } from '@/types/prospect';

export const mockProspect: Prospect = {
  id: '1',
  name: 'Priya Sharma',
  company: 'TechVentures India',
  role: 'Head of Engineering',
  phone: '+91 98765 43210',
  lastCallOutcome: 'Interested, asked for demo',
  stage: 'MQL',
  objective: 'Schedule product demo for next week',
  previousNotes: [
    'Mentioned budget approval needed from CFO',
    'Preferred meeting time: After 3 PM IST',
    'Currently using competitor product - unhappy with support',
  ],
  aiContextReminder: '💡 Mention our 24/7 support team to address previous pain point',
};

export const mockReports: Record<string, DayReport> = {
  yesterday: {
    date: new Date(Date.now() - 86400000),
    totalTalkTime: 142,
    emotionalEngagement: {
      comfortable: 65,
      neutral: 25,
      stressed: 10,
    },
    talkRatio: {
      agent: 42,
      prospect: 58,
    },
    aiFeedback: 'Excellent listening skills demonstrated. Prospects stayed engaged throughout calls.',
    improvementSuggestions: [
      'Try asking more open-ended questions',
      'Pause 2-3 seconds before responding',
      'Mirror prospect language patterns more',
    ],
  },
  lastWeek: {
    date: new Date(Date.now() - 7 * 86400000),
    totalTalkTime: 847,
    emotionalEngagement: {
      comfortable: 58,
      neutral: 30,
      stressed: 12,
    },
    talkRatio: {
      agent: 45,
      prospect: 55,
    },
    aiFeedback: 'Good rapport building. Conversion rate improved by 12% compared to previous week.',
    improvementSuggestions: [
      'Focus on value proposition earlier in calls',
      'Handle objections with more empathy',
      'End calls with clear next steps',
    ],
  },
  lastMonth: {
    date: new Date(Date.now() - 30 * 86400000),
    totalTalkTime: 3420,
    emotionalEngagement: {
      comfortable: 52,
      neutral: 33,
      stressed: 15,
    },
    talkRatio: {
      agent: 48,
      prospect: 52,
    },
    aiFeedback: 'Consistent performance with room for growth. Strong closing skills in final week.',
    improvementSuggestions: [
      'Reduce filler words ("um", "like")',
      'Practice handling price objections',
      'Build stronger opening statements',
    ],
  },
};

export const coachingSuggestions = [
  '🎯 Mention the demo scheduling now',
  '👂 Let them finish - good listening',
  '💡 Great time to address support concerns',
  '🔥 Prospect sounds interested - close the meeting',
  '⏸️ Slow down slightly, they seem overwhelmed',
];
