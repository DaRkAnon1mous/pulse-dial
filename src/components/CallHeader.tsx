import { useEffect, useState } from 'react';

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
    <div className="flex items-center justify-between py-3">
      {/* Left: Avatar and info */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <span className="text-sm font-medium text-muted-foreground">
            {prospectName.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div>
          <p className="font-medium text-foreground">{prospectName}</p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary recording-dot" />
            <span className="text-xs text-muted-foreground">Recording</span>
          </div>
        </div>
      </div>
      
      {/* Right: Timer */}
      <div className="flex items-center gap-2">
        <span className="font-mono text-lg font-medium text-foreground tabular-nums">
          {duration}
        </span>
      </div>
    </div>
  );
}
