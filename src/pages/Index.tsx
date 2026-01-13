import { useState } from 'react';
import { DialerScreen } from '@/components/DialerScreen';
import { ReportsScreen } from '@/components/ReportsScreen';
import { HomeScreen } from '@/components/HomeScreen';
import { FeedScreen } from '@/components/FeedScreen';
import { BottomNavigation } from '@/components/BottomNavigation';

const Index = () => {
  const [activeScreen, setActiveScreen] = useState('home');

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <HomeScreen onNavigateToFeed={() => setActiveScreen('feed')} />;
      case 'dialer':
        return <DialerScreen />;
      case 'feed':
        return <FeedScreen />;
      case 'reports':
        return <ReportsScreen />;
      default:
        return <HomeScreen onNavigateToFeed={() => setActiveScreen('feed')} />;
    }
  };

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto relative">
      {renderScreen()}
      
      <BottomNavigation 
        activeTab={activeScreen} 
        onTabChange={setActiveScreen}
        isInCall={false}
      />
    </div>
  );
};

export default Index;
