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

    progressInterval.current = setInterval(() => {
      setProgress((prev) => Math.min(prev + 2, 100));
    }, 40);

    holdTimer.current = setTimeout(() => {
      onEndCall();
      cleanup();
    }, 2000);
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

  return (
    <div className="relative">
      <button
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
        className={`w-full relative overflow-hidden bg-destructive/10 border-2 border-destructive text-destructive rounded-2xl py-4 px-6 flex items-center justify-center gap-3 font-semibold transition-all duration-200 ${
          isHolding ? 'scale-[0.98]' : ''
        }`}
      >
        {/* Progress fill */}
        <div 
          className="absolute inset-0 bg-destructive transition-all duration-100 ease-linear"
          style={{ width: `${progress}%`, opacity: 0.2 }}
        />
        
        <PhoneOff className="w-5 h-5 relative z-10" />
        <span className="relative z-10">
          {isHolding ? 'Hold to End...' : 'Hold to End Call'}
        </span>
      </button>
      
      {/* Progress indicator */}
      {isHolding && (
        <div className="absolute -bottom-1 left-0 right-0 h-1 bg-destructive/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-destructive rounded-full transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
