import { useState, useRef } from 'react';
import { PhoneOff } from 'lucide-react';

interface EndCallButtonProps {
  onEndCall: () => void;
}

export function EndCallButton({ onEndCall }: EndCallButtonProps) {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const holdTimer = useRef<NodeJS.Timeout | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const handlePressStart = () => {
    setIsHolding(true);
    setProgress(0);

    // Update progress for circular indicator - 1.2s hold
    progressInterval.current = setInterval(() => {
      setProgress((prev) => Math.min(prev + (100 / 24), 100)); // 24 steps over 1.2s = 50ms intervals
    }, 50);

    holdTimer.current = setTimeout(() => {
      onEndCall();
      cleanup();
    }, 1200);
  };

  const handlePressEnd = () => {
    cleanup();
  };

  const cleanup = () => {
    setIsHolding(false);
    setProgress(0);
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  };

  const circumference = 2 * Math.PI * 16;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <button
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      className={`group relative flex items-center justify-center gap-3 w-full py-4 rounded-xl transition-all duration-200 ${
        isHolding 
          ? 'bg-destructive text-destructive-foreground scale-[0.98]' 
          : 'bg-muted hover:bg-muted/80 text-muted-foreground'
      }`}
    >
      {/* Circular progress indicator */}
      <div className="relative w-6 h-6">
        <svg className="w-6 h-6 -rotate-90" viewBox="0 0 36 36">
          {/* Background circle */}
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="opacity-20"
          />
          {/* Progress circle */}
          {isHolding && (
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-75"
            />
          )}
        </svg>
        <PhoneOff className="absolute inset-0 m-auto w-3.5 h-3.5" />
      </div>
      
      <span className="text-sm font-medium">
        {isHolding ? 'Ending...' : 'Hold to end'}
      </span>
    </button>
  );
}
