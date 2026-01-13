import { Phone } from 'lucide-react';

interface CallButtonProps {
  onCall: () => void;
}

export function CallButton({ onCall }: CallButtonProps) {
  return (
    <button
      onClick={onCall}
      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl py-5 px-6 flex items-center justify-center gap-3 font-semibold text-lg shadow-call call-button-glow transition-all duration-200 active:scale-[0.98]"
    >
      <Phone className="w-6 h-6" fill="currentColor" />
      <span>Start Call</span>
    </button>
  );
}
