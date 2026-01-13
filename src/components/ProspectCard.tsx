import { Prospect } from '@/types/prospect';
import { Building2, User, Phone, TrendingUp } from 'lucide-react';

interface ProspectCardProps {
  prospect: Prospect;
}

export function ProspectCard({ prospect }: ProspectCardProps) {
  return (
    <div className="bg-card rounded-2xl p-5 shadow-card slide-up">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <span className="text-xl font-bold text-primary">
              {prospect.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">{prospect.name}</h2>
            <p className="text-sm text-muted-foreground">{prospect.role}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          prospect.stage === 'SQL' 
            ? 'bg-primary/10 text-primary' 
            : 'bg-secondary/10 text-secondary'
        }`}>
          {prospect.stage}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <Building2 className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground">{prospect.company}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Phone className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground font-medium">{prospect.phone}</span>
        </div>
        <div className="flex items-start gap-3 text-sm">
          <TrendingUp className="w-4 h-4 text-muted-foreground mt-0.5" />
          <span className="text-muted-foreground">{prospect.lastCallOutcome}</span>
        </div>
      </div>
    </div>
  );
}
