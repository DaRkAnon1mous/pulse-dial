import { Prospect } from '@/types/prospect';

interface InfoTabProps {
  prospect: Prospect;
}

export function InfoTab({ prospect }: InfoTabProps) {
  return (
    <div className="space-y-6 fade-in">
      {/* AI Context Reminder - subtle suggestion card */}
      <div className="bg-ai-hint/10 rounded-lg p-4">
        <p className="text-xs font-medium text-ai-hint-foreground/70 uppercase tracking-wide mb-1.5">
          AI Reminder
        </p>
        <p className="text-sm text-foreground/80 font-light leading-relaxed">
          {prospect.aiContextReminder}
        </p>
      </div>

      {/* Call Objective */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Objective
        </p>
        <p className="text-foreground leading-relaxed">{prospect.objective}</p>
      </div>

      {/* Previous Notes */}
      <div className="space-y-3">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Previous Notes
        </p>
        <ul className="space-y-2">
          {prospect.previousNotes.map((note, index) => (
            <li key={index} className="flex items-start gap-2.5 text-sm text-muted-foreground font-light">
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40 mt-2 flex-shrink-0" />
              {note}
            </li>
          ))}
        </ul>
      </div>

      {/* Prospect Details */}
      <div className="pt-4 border-t border-border/50">
        <div className="grid grid-cols-2 gap-y-4 gap-x-6">
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Company</p>
            <p className="text-sm text-foreground font-light">{prospect.company}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Role</p>
            <p className="text-sm text-foreground font-light">{prospect.role}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Stage</p>
            <p className="text-sm text-foreground font-light">{prospect.stage}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Last Outcome</p>
            <p className="text-sm text-foreground font-light">{prospect.lastCallOutcome}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
