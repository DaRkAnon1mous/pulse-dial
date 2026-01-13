import { useEffect, useState, useRef } from 'react';
import { EmotionalState } from '@/types/prospect';
import { ECGPulse } from './ECGPulse';
import { coachingSuggestions } from '@/data/mockData';
import { Activity, Lightbulb } from 'lucide-react';

interface PulseTabProps {
  isActive?: boolean;
}

// Mock live analysis insights that rotate
const liveAnalysisInsights = [
  ['Prospect is engaged and asking questions', 'Talk ratio balanced well'],
  ['Prospect shows hesitation around pricing', 'Consider addressing value proposition'],
  ['Agent is speaking more than the prospect', 'Try asking open-ended questions'],
  ['Engagement increased after value-based explanation', 'Good momentum building'],
  ['Prospect asking technical questions', 'Interest level appears high'],
  ['Conversation pace is comfortable', 'Prospect seems receptive'],
];

export function PulseTab({ isActive = true }: PulseTabProps) {
  const [emotionalState, setEmotionalState] = useState<EmotionalState>('Comfortable');
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([
    coachingSuggestions[0],
    coachingSuggestions[1],
  ]);
  const [liveInsights, setLiveInsights] = useState<string[]>(liveAnalysisInsights[0]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const stateStyles = {
    Comfortable: 'text-stress-low',
    Neutral: 'text-stress-medium',
    Stressed: 'text-stress-high',
  };

  // Simulate emotional state changes every 20 seconds - runs regardless of tab
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const states: EmotionalState[] = ['Comfortable', 'Neutral', 'Stressed'];
      const weights = [0.6, 0.3, 0.1];
      const random = Math.random();
      let cumulative = 0;
      
      for (let i = 0; i < states.length; i++) {
        cumulative += weights[i];
        if (random < cumulative) {
          setEmotionalState(states[i]);
          break;
        }
      }
      
      // Update suggestions - pick 2 random
      const shuffled = [...coachingSuggestions].sort(() => 0.5 - Math.random());
      setCurrentSuggestions([shuffled[0], shuffled[1]]);

      // Update live insights - pick random set
      const randomInsights = liveAnalysisInsights[Math.floor(Math.random() * liveAnalysisInsights.length)];
      setLiveInsights(randomInsights);
    }, 20000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-5 fade-in">
      {/* Emotional State - minimal header */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Voice Pulse
        </p>
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full pulse-dot ${
            emotionalState === 'Comfortable' ? 'bg-stress-low' :
            emotionalState === 'Neutral' ? 'bg-stress-medium' : 'bg-stress-high'
          }`} />
          <span className={`text-sm font-medium ${stateStyles[emotionalState]}`}>
            {emotionalState}
          </span>
        </div>
      </div>

      {/* ECG Visualization - cleaner */}
      <ECGPulse emotionalState={emotionalState} />

      {/* Live Call Analysis - NEW SECTION */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-muted-foreground" />
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Live Analysis
          </p>
        </div>
        <div className="bg-card/50 rounded-lg p-3 border border-border/30 space-y-1.5">
          {liveInsights.map((insight, index) => (
            <p key={index} className="text-sm text-foreground/70 leading-relaxed">
              • {insight}
            </p>
          ))}
        </div>
      </div>

      {/* AI Suggestions - subtle cards */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-3.5 h-3.5 text-ai-hint" />
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Suggestions
          </p>
        </div>
        <div className="space-y-2">
          {currentSuggestions.map((suggestion, index) => (
            <div 
              key={index}
              className="bg-ai-hint/8 rounded-lg px-4 py-3"
            >
              <p className="text-sm text-foreground/80 font-light leading-relaxed">
                {suggestion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
