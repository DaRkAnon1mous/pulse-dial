import { useState } from 'react';
import { DialerScreen } from '@/components/DialerScreen';
import { ReportsScreen } from '@/components/ReportsScreen';
import { BottomNavigation } from '@/components/BottomNavigation';

const Index = () => {
  const [activeScreen, setActiveScreen] = useState('dialer');

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto relative">
      {activeScreen === 'dialer' ? <DialerScreen /> : <ReportsScreen />}
      
      <BottomNavigation 
        activeTab={activeScreen} 
        onTabChange={setActiveScreen}
        isInCall={false}
      />
    </div>
  );
};

export default Index;
