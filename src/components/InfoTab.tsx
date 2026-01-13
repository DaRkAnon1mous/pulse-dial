import { Prospect } from '@/types/prospect';
import { Target, FileText, Sparkles } from 'lucide-react';

interface InfoTabProps {
  prospect: Prospect;
}

export function InfoTab({ prospect }: InfoTabProps) {
  return (
    <div className="space-y-4 slide-up">
      {/* AI Context Reminder */}
      <div className="bg-gradient-to-r from-secondary/10 to-secondary/5 rounded-2xl p-4 border border-secondary/20">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-secondary" />
          <span className="text-xs font-semibold text-secondary uppercase tracking-wide">AI Reminder</span>
        </div>
        <p className="text-sm text-foreground">{prospect.aiContextReminder}</p>
      </div>

      {/* Call Objective */}
      <div className="bg-card rounded-2xl p-4 shadow-card">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Objective</span>
        </div>
        <p className="text-foreground font-medium">{prospect.objective}</p>
      </div>

      {/* Previous Notes */}
      <div className="bg-card rounded-2xl p-4 shadow-card">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Previous Notes</span>
        </div>
        <ul className="space-y-2">
          {prospect.previousNotes.map((note, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 mt-2 flex-shrink-0" />
              {note}
            </li>
          ))}
        </ul>
      </div>

      {/* Prospect Details Mini Card */}
      <div className="bg-muted/50 rounded-2xl p-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground text-xs">Company</span>
            <p className="font-medium text-foreground">{prospect.company}</p>
          </div>
          <div>
            <span className="text-muted-foreground text-xs">Role</span>
            <p className="font-medium text-foreground">{prospect.role}</p>
          </div>
          <div>
            <span className="text-muted-foreground text-xs">Stage</span>
            <p className="font-medium text-foreground">{prospect.stage}</p>
          </div>
          <div>
            <span className="text-muted-foreground text-xs">Last Outcome</span>
            <p className="font-medium text-foreground text-xs">{prospect.lastCallOutcome}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
