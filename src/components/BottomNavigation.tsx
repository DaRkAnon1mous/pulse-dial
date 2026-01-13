import { BarChart3, PhoneCall } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isInCall?: boolean;
}

export function BottomNavigation({ activeTab, onTabChange, isInCall }: BottomNavigationProps) {
  // During active call, don't show bottom nav (tabs are in-screen)
  if (isInCall) {
    return null;
  }

  const tabs = [
    { id: 'dialer', label: 'Dialer', icon: PhoneCall },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border/50 px-4 py-2 z-50">
      <div className="max-w-[430px] mx-auto flex justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 py-2 px-8 rounded-lg transition-colors ${
                isActive 
                  ? 'text-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2px]' : 'stroke-[1.5px]'}`} />
              <span className={`text-xs ${isActive ? 'font-medium' : 'font-light'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
