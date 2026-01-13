import { useState } from 'react';
import { mockProspect } from '@/data/mockData';
import { ProspectCard } from './ProspectCard';
import { CallButton } from './CallButton';
import { CallHeader } from './CallHeader';
import { InfoTab } from './InfoTab';
import { PulseTab } from './PulseTab';
import { EndCallButton } from './EndCallButton';
import { DispositionScreen } from './DispositionScreen';
import { BottomNavigation } from './BottomNavigation';

type DialerState = 'idle' | 'in-call' | 'disposition';

export function DialerScreen() {
  const [state, setState] = useState<DialerState>('idle');
  const [activeTab, setActiveTab] = useState('info');
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
      <div className="bg-card border-b border-border px-5 pt-8 pb-4">
        <h1 className="text-2xl font-bold text-foreground">
          {state === 'in-call' ? 'Active Call' : 'Next Prospect'}
        </h1>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {state === 'idle' ? (
          <>
            <ProspectCard prospect={mockProspect} />
            <CallButton onCall={handleStartCall} />
          </>
        ) : (
          <>
            <CallHeader 
              prospectName={mockProspect.name} 
              startTime={callStartTime!} 
            />
            
            {/* Tab Content */}
            <div className="mt-4">
              {activeTab === 'info' ? (
                <InfoTab prospect={mockProspect} />
              ) : (
                <PulseTab />
              )}
            </div>

            {/* End Call Button */}
            <div className="mt-6">
              <EndCallButton onEndCall={handleEndCall} />
            </div>
          </>
        )}
      </div>

      {/* In-call Navigation */}
      {state === 'in-call' && (
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          isInCall={true}
        />
      )}
    </div>
  );
}
