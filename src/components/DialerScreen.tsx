import { useState } from 'react';
import { mockProspect } from '@/data/mockData';
import { ProspectCard } from './ProspectCard';
import { CallButton } from './CallButton';
import { CallHeader } from './CallHeader';
import { InfoTab } from './InfoTab';
import { PulseTab } from './PulseTab';
import { EndCallButton } from './EndCallButton';
import { DispositionScreen } from './DispositionScreen';

type DialerState = 'idle' | 'in-call' | 'disposition';
type InCallTab = 'info' | 'pulse';

export function DialerScreen() {
  const [state, setState] = useState<DialerState>('idle');
  const [activeTab, setActiveTab] = useState<InCallTab>('info');
  const [callStartTime, setCallStartTime] = useState<Date | null>(null);

  const handleStartCall = () => {
    setState('in-call');
    setCallStartTime(new Date());
    setActiveTab('info');
  };

  const handleEndCall = () => {
    setState('disposition');
  };

  const handleDispositionComplete = (disposition: string) => {
    console.log('Disposition:', disposition);
    setState('idle');
    setCallStartTime(null);
  };

  if (state === 'disposition') {
    return <DispositionScreen onComplete={handleDispositionComplete} />;
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-5 pt-12 pb-2">
        <h1 className="text-lg font-medium text-foreground">
          {state === 'in-call' ? 'Active Call' : 'Next Prospect'}
        </h1>
      </div>

      {/* Content */}
      <div className="px-5">
        {state === 'idle' ? (
          <div className="space-y-6 pt-2">
            <ProspectCard prospect={mockProspect} />
            <CallButton onCall={handleStartCall} />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Combined header row */}
            <CallHeader 
              prospectName={mockProspect.name} 
              startTime={callStartTime!} 
            />
            
            {/* In-screen tabs - minimal */}
            <div className="flex gap-1 bg-muted/50 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('info')}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all ${
                  activeTab === 'info'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Info
              </button>
              <button
                onClick={() => setActiveTab('pulse')}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all ${
                  activeTab === 'pulse'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Pulse
              </button>
            </div>

            {/* Tab Content */}
            <div className="min-h-[360px]">
              {activeTab === 'info' ? (
                <InfoTab prospect={mockProspect} />
              ) : (
                <PulseTab isActive={activeTab === 'pulse'} />
              )}
            </div>

            {/* End Call Button */}
            <div className="pt-2">
              <EndCallButton onEndCall={handleEndCall} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
