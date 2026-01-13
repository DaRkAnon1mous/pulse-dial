import { Check, TrendingUp, TrendingDown, Lightbulb, ArrowRight } from 'lucide-react';

interface CallAnalysisSummaryProps {
  disposition: string;
  onContinue: () => void;
}

const dispositionLabels: Record<string, string> = {
  didnt_connect: "Didn't Connect",
  reschedule: 'Rescheduled',
  not_interested: 'Not Interested',
  dnd: 'Do Not Disturb',
  wrong_number: 'Wrong Number',
  conversation_review: 'Conversation Reviewed',
};

export function CallAnalysisSummary({ disposition, onContinue }: CallAnalysisSummaryProps) {
  // Mock analysis data - in production this would come from AI analysis
  const analysis = {
    emotionalTrend: 'Gradually Improving',
    emotionalDescription: 'Started neutral, ended on a positive note',
    keyObservations: [
      'Prospect showed initial hesitation around timeline',
      'Engagement increased when discussing ROI benefits',
      'Clear interest in technical capabilities',
    ],
    whatWorked: [
      'Value-focused opening statement',
      'Active listening during objections',
      'Clear explanation of implementation process',
    ],
    improvements: [
      'Address pricing concerns earlier in the conversation',
      'Ask more discovery questions upfront',
    ],
    nextCallSuggestion: 'Lead with a case study relevant to their industry to build credibility faster.',
  };

  return (
    <div className="min-h-screen bg-background p-5 pt-8 slide-up">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lightbulb className="w-7 h-7 text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">Call Analysis</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {dispositionLabels[disposition] || disposition}
        </p>
      </div>

      <div className="space-y-6">
        {/* Emotional Trend */}
        <div className="bg-card rounded-xl p-4 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-stress-low" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Emotional Trend
            </span>
          </div>
          <p className="text-foreground font-medium">{analysis.emotionalTrend}</p>
          <p className="text-sm text-muted-foreground mt-1">{analysis.emotionalDescription}</p>
        </div>

        {/* Key Observations */}
        <div className="space-y-2">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-1">
            Key Observations
          </h3>
          <div className="bg-card rounded-xl p-4 border border-border/50 space-y-2">
            {analysis.keyObservations.map((observation, index) => (
              <p key={index} className="text-sm text-foreground/80 leading-relaxed">
                • {observation}
              </p>
            ))}
          </div>
        </div>

        {/* What Worked */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-1">
            <Check className="w-4 h-4 text-stress-low" />
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              What Worked Well
            </h3>
          </div>
          <div className="bg-stress-low/5 rounded-xl p-4 border border-stress-low/20 space-y-2">
            {analysis.whatWorked.map((item, index) => (
              <p key={index} className="text-sm text-foreground/80 leading-relaxed">
                ✓ {item}
              </p>
            ))}
          </div>
        </div>

        {/* Improvements */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-1">
            <TrendingDown className="w-4 h-4 text-stress-medium" />
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Areas to Improve
            </h3>
          </div>
          <div className="bg-stress-medium/5 rounded-xl p-4 border border-stress-medium/20 space-y-2">
            {analysis.improvements.map((item, index) => (
              <p key={index} className="text-sm text-foreground/80 leading-relaxed">
                → {item}
              </p>
            ))}
          </div>
        </div>

        {/* Next Call Suggestion */}
        <div className="bg-ai-hint/10 rounded-xl p-4 border border-ai-hint/20">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-ai-hint" />
            <span className="text-xs font-medium text-ai-hint uppercase tracking-wide">
              Suggestion for Next Call
            </span>
          </div>
          <p className="text-sm text-foreground/90 leading-relaxed">
            {analysis.nextCallSuggestion}
          </p>
        </div>

        {/* Reporting Note */}
        <p className="text-xs text-muted-foreground/70 text-center px-4">
          This analysis contributes to your daily, weekly, and monthly performance reports.
        </p>

        {/* Continue Button */}
        <button
          onClick={onContinue}
          className="w-full bg-primary text-primary-foreground rounded-2xl py-4 px-6 flex items-center justify-center gap-2 font-semibold text-lg shadow-call mt-4"
        >
          Done
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
