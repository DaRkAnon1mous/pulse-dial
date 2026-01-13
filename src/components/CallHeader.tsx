import { useEffect, useState } from 'react';
import { Mic } from 'lucide-react';

interface CallHeaderProps {
  prospectName: string;
  startTime: Date;
}

export function CallHeader({ prospectName, startTime }: CallHeaderProps) {
  const [duration, setDuration] = useState('00:00');

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = Math.floor((Date.now() - startTime.getTime()) / 1000);
      const minutes = Math.floor(diff / 60).toString().padStart(2, '0');
      const seconds = (diff % 60).toString().padStart(2, '0');
      setDuration(`${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <div className="bg-card rounded-2xl p-4 shadow-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-lg font-bold text-primary">
              {prospectName.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <p className="font-semibold text-foreground">{prospectName}</p>
            <p className="text-sm text-muted-foreground">In call</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Recording indicator */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-destructive recording-dot" />
            <Mic className="w-4 h-4 text-muted-foreground" />
          </div>
          
          {/* Duration */}
          <div className="bg-muted rounded-lg px-3 py-1.5">
            <span className="font-mono font-semibold text-foreground">{duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
