import { useState } from 'react';
import { mockReports } from '@/data/mockData';
import { Clock, Users, Mic2, Sparkles, TrendingUp, ArrowUpRight } from 'lucide-react';

type ReportPeriod = 'yesterday' | 'lastWeek' | 'lastMonth';

export function ReportsScreen() {
  const [period, setPeriod] = useState<ReportPeriod>('yesterday');

  const tabs = [
    { id: 'yesterday' as const, label: 'Yesterday' },
    { id: 'lastWeek' as const, label: 'Last Week' },
    { id: 'lastMonth' as const, label: 'Last Month' },
  ];

  const report = mockReports[period];

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card border-b border-border px-5 pt-8 pb-4">
        <h1 className="text-2xl font-bold text-foreground mb-4">Reports</h1>
        
        {/* Period Tabs */}
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setPeriod(tab.id)}
              className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all ${
                period === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4 slide-up">
        {/* Total Talk Time */}
        <div className="bg-card rounded-2xl p-5 shadow-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Talk Time</p>
                <p className="text-2xl font-bold text-foreground">{formatTime(report.totalTalkTime)}</p>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-primary" />
          </div>
        </div>

        {/* Emotional Engagement */}
        <div className="bg-card rounded-2xl p-5 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Emotional Engagement</h3>
          </div>
          
          <div className="space-y-3">
            {/* Comfortable */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Comfortable</span>
                <span className="font-semibold text-stress-low">{report.emotionalEngagement.comfortable}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-stress-low rounded-full transition-all duration-500"
                  style={{ width: `${report.emotionalEngagement.comfortable}%` }}
                />
              </div>
            </div>
            
            {/* Neutral */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Neutral</span>
                <span className="font-semibold text-stress-medium">{report.emotionalEngagement.neutral}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-stress-medium rounded-full transition-all duration-500"
                  style={{ width: `${report.emotionalEngagement.neutral}%` }}
                />
              </div>
            </div>
            
            {/* Stressed */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Stressed</span>
                <span className="font-semibold text-stress-high">{report.emotionalEngagement.stressed}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-stress-high rounded-full transition-all duration-500"
                  style={{ width: `${report.emotionalEngagement.stressed}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Talk Ratio */}
        <div className="bg-card rounded-2xl p-5 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Mic2 className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Talk Ratio</h3>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="h-3 bg-muted rounded-full overflow-hidden flex">
                <div 
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${report.talkRatio.agent}%` }}
                />
                <div 
                  className="h-full bg-secondary transition-all duration-500"
                  style={{ width: `${report.talkRatio.prospect}%` }}
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-between mt-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">You: {report.talkRatio.agent}%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-secondary" />
              <span className="text-muted-foreground">Prospect: {report.talkRatio.prospect}%</span>
            </div>
          </div>
        </div>

        {/* AI Feedback */}
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl p-5 border border-primary/20">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">AI Feedback</h3>
          </div>
          <p className="text-foreground">{report.aiFeedback}</p>
        </div>

        {/* Improvement Suggestions */}
        <div className="bg-card rounded-2xl p-5 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Areas to Improve</h3>
          </div>
          
          <ul className="space-y-3">
            {report.improvementSuggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-muted-foreground text-sm">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
