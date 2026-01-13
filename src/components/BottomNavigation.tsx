import { Info, Activity, BarChart3, PhoneCall } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isInCall?: boolean;
}

export function BottomNavigation({ activeTab, onTabChange, isInCall }: BottomNavigationProps) {
  const tabs = isInCall
    ? [
        { id: 'info', label: 'Info', icon: Info },
        { id: 'pulse', label: 'Pulse', icon: Activity },
      ]
    : [
        { id: 'dialer', label: 'Dialer', icon: PhoneCall },
        { id: 'reports', label: 'Reports', icon: BarChart3 },
      ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-2 z-50">
      <div className="max-w-[430px] mx-auto flex justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 py-2 px-6 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5px]' : ''}`} />
              <span className="text-xs font-medium">{tab.label}</span>
              {isActive && (
                <div className="absolute bottom-1 w-1 h-1 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
