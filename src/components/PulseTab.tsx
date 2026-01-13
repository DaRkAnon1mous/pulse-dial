import { useEffect, useState } from 'react';
import { EmotionalState } from '@/types/prospect';
import { ECGPulse } from './ECGPulse';
import { coachingSuggestions } from '@/data/mockData';
import { Lightbulb, RefreshCw } from 'lucide-react';

export function PulseTab() {
  const [emotionalState, setEmotionalState] = useState<EmotionalState>('Comfortable');
  const [currentSuggestion, setCurrentSuggestion] = useState(coachingSuggestions[0]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const stateColors = {
    Comfortable: 'text-stress-low bg-stress-low/10',
    Neutral: 'text-stress-medium bg-stress-medium/10',
    Stressed: 'text-stress-high bg-stress-high/10',
  };

  // Simulate emotional state changes every 20 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const states: EmotionalState[] = ['Comfortable', 'Neutral', 'Stressed'];
      const weights = [0.6, 0.3, 0.1]; // Bias towards comfortable
      const random = Math.random();
      let cumulative = 0;
      
      for (let i = 0; i < states.length; i++) {
        cumulative += weights[i];
        if (random < cumulative) {
          setEmotionalState(states[i]);
          break;
        }
      }
      
      // Update suggestion
      const randomIndex = Math.floor(Math.random() * coachingSuggestions.length);
      setCurrentSuggestion(coachingSuggestions[randomIndex]);
      setLastUpdate(Date.now());
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const timeSinceUpdate = Math.floor((Date.now() - lastUpdate) / 1000);

  return (
    <div className="space-y-5 slide-up">
      {/* Emotional State Header */}
      <div className="bg-card rounded-2xl p-5 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Emotional State
          </span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <RefreshCw className="w-3 h-3" />
            <span>{timeSinceUpdate}s ago</span>
          </div>
        </div>
        
        {/* State Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold ${stateColors[emotionalState]}`}>
          <span className={`w-2 h-2 rounded-full pulse-dot ${
            emotionalState === 'Comfortable' ? 'bg-stress-low' :
            emotionalState === 'Neutral' ? 'bg-stress-medium' : 'bg-stress-high'
          }`} />
          {emotionalState}
        </div>
      </div>

      {/* ECG Visualization */}
      <div className="bg-card rounded-2xl p-5 shadow-card">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-4">
          Voice Pulse
        </span>
        <ECGPulse emotionalState={emotionalState} />
      </div>

      {/* AI Coaching Suggestion */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl p-5 border border-primary/20">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-primary uppercase tracking-wide">
            AI Coaching
          </span>
        </div>
        <p className="text-foreground font-medium text-lg">
          {currentSuggestion}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-card rounded-xl p-3 text-center shadow-card">
          <span className="text-2xl font-bold text-stress-low">68%</span>
          <p className="text-xs text-muted-foreground mt-1">Comfortable</p>
        </div>
        <div className="bg-card rounded-xl p-3 text-center shadow-card">
          <span className="text-2xl font-bold text-stress-medium">24%</span>
          <p className="text-xs text-muted-foreground mt-1">Neutral</p>
        </div>
        <div className="bg-card rounded-xl p-3 text-center shadow-card">
          <span className="text-2xl font-bold text-stress-high">8%</span>
          <p className="text-xs text-muted-foreground mt-1">Stressed</p>
        </div>
      </div>
    </div>
  );
}
