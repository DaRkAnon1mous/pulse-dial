import { useEffect, useState } from 'react';
import { EmotionalState } from '@/types/prospect';

interface ECGPulseProps {
  emotionalState: EmotionalState;
}

export function ECGPulse({ emotionalState }: ECGPulseProps) {
  const [pathOffset, setPathOffset] = useState(0);
  
  const stateColors = {
    Comfortable: 'hsl(var(--stress-low))',
    Neutral: 'hsl(var(--stress-medium))',
    Stressed: 'hsl(var(--stress-high))',
  };

  const color = stateColors[emotionalState];

  // Generate ECG-like path
  const generateECGPath = () => {
    const width = 320;
    const height = 100;
    const midY = height / 2;
    const segmentWidth = 80;
    
    let path = `M 0 ${midY}`;
    
    for (let x = 0; x < width; x += segmentWidth) {
      // Flat line
      path += ` L ${x + 15} ${midY}`;
      // Small bump (P wave)
      path += ` Q ${x + 20} ${midY - 8} ${x + 25} ${midY}`;
      // Flat
      path += ` L ${x + 30} ${midY}`;
      // Sharp spike up (QRS complex)
      path += ` L ${x + 35} ${midY - 4}`;
      path += ` L ${x + 40} ${midY - 40}`;
      path += ` L ${x + 45} ${midY + 16}`;
      path += ` L ${x + 50} ${midY}`;
      // T wave
      path += ` Q ${x + 60} ${midY - 12} ${x + 70} ${midY}`;
      // Return to baseline
      path += ` L ${x + segmentWidth} ${midY}`;
    }
    
    return path;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPathOffset((prev) => (prev + 1.5) % 80);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-24 overflow-hidden rounded-lg bg-muted/50">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(4)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full h-px bg-foreground"
            style={{ top: `${(i + 1) * 20}%` }}
          />
        ))}
      </div>
      
      {/* ECG Line */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 320 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="ecgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.1" />
            <stop offset="50%" stopColor={color} stopOpacity="0.8" />
            <stop offset="100%" stopColor={color} stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path
          d={generateECGPath()}
          fill="none"
          stroke="url(#ecgGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: `translateX(-${pathOffset}px)`,
            transition: 'transform 0.05s linear',
          }}
        />
      </svg>

      {/* Pulse dot - right edge */}
      <div 
        className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full pulse-dot"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}
