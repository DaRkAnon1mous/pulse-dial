import { useState } from 'react';
import { 
  PhoneMissed, 
  Calendar, 
  ThumbsDown, 
  BellOff, 
  Phone, 
  MessageSquare,
  ArrowLeft,
  Check
} from 'lucide-react';

interface DispositionScreenProps {
  onComplete: (disposition: string) => void;
}

type DispositionType = 'didnt_connect' | 'reschedule' | 'not_interested' | 'dnd' | 'wrong_number' | 'conversation_review' | null;

export function DispositionScreen({ onComplete }: DispositionScreenProps) {
  const [selected, setSelected] = useState<DispositionType>(null);
  const [notes, setNotes] = useState('');
  const [stage, setStage] = useState<'MQL' | 'SQL'>('MQL');

  const dispositions = [
    { id: 'didnt_connect' as const, label: "Didn't Connect", icon: PhoneMissed, color: 'text-muted-foreground' },
    { id: 'reschedule' as const, label: 'Reschedule', icon: Calendar, color: 'text-primary' },
    { id: 'not_interested' as const, label: 'Not Interested', icon: ThumbsDown, color: 'text-destructive' },
    { id: 'dnd' as const, label: 'Do Not Disturb', icon: BellOff, color: 'text-stress-medium' },
    { id: 'wrong_number' as const, label: 'Wrong Number', icon: Phone, color: 'text-muted-foreground' },
    { id: 'conversation_review' as const, label: 'Conversation Review', icon: MessageSquare, color: 'text-primary' },
  ];

  const handleSubmit = () => {
    if (selected) {
      onComplete(selected);
    }
  };

  if (selected === 'conversation_review') {
    return (
      <div className="min-h-screen bg-background p-5 pt-6 slide-up">
        <button 
          onClick={() => setSelected(null)}
          className="flex items-center gap-2 text-muted-foreground mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <h2 className="text-2xl font-bold text-foreground mb-6">Conversation Review</h2>

        {/* Stage Selection */}
        <div className="mb-6">
          <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide block mb-3">
            Lead Stage
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => setStage('MQL')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                stage === 'MQL' 
                  ? 'bg-secondary text-secondary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              MQL
            </button>
            <button
              onClick={() => setStage('SQL')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                stage === 'SQL' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              SQL
            </button>
          </div>
        </div>

        {/* Notes */}
        <div className="mb-8">
          <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide block mb-3">
            Call Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Key takeaways from the call..."
            className="w-full h-32 bg-card border border-border rounded-xl p-4 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-primary text-primary-foreground rounded-2xl py-4 px-6 flex items-center justify-center gap-2 font-semibold text-lg shadow-call"
        >
          <Check className="w-5 h-5" />
          Save & Continue
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-5 pt-8 slide-up">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Call Ended</h2>
        <p className="text-muted-foreground mt-1">How did it go?</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {dispositions.map((disposition) => {
          const Icon = disposition.icon;
          const isSelected = selected === disposition.id;
          
          return (
            <button
              key={disposition.id}
              onClick={() => setSelected(disposition.id)}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                isSelected 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border bg-card hover:border-primary/30'
              }`}
            >
              <Icon className={`w-6 h-6 ${isSelected ? 'text-primary' : disposition.color}`} />
              <span className={`text-sm font-medium text-center ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                {disposition.label}
              </span>
            </button>
          );
        })}
      </div>

      {selected && (
        <button
          onClick={handleSubmit}
          className="w-full bg-primary text-primary-foreground rounded-2xl py-4 px-6 flex items-center justify-center gap-2 font-semibold text-lg shadow-call slide-up"
        >
          <Check className="w-5 h-5" />
          Continue
        </button>
      )}
    </div>
  );
}
