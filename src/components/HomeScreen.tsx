import { Phone, Sparkles, Calendar, ArrowRight, Users } from 'lucide-react';
import { useRescheduledCalls } from '@/contexts/RescheduledCallsContext';
import { format, isToday, isTomorrow } from 'date-fns';

const aiPlanPoints = [
  "Lead with value: mention 24/7 support early in calls",
  "Focus on pain points around competitor limitations",
  "Ask about budget timelines before pitching demos",
];

const pitchHints = [
  "Ask open-ended questions before discussing pricing",
  "Mirror the prospect's language to build rapport",
  "Pause 2-3 seconds after key questions",
  "Mention case studies relevant to their industry",
];

const featuredPost = {
  author: 'Arjun Mehta',
  role: 'Senior BD',
  title: 'How I handled a pricing objection from a CTO',
  excerpt: 'Instead of defending our price, I asked what specific features they needed most...',
  outcome: 'Converted' as const,
};

interface HomeScreenProps {
  onNavigateToFeed?: () => void;
}

export function HomeScreen({ onNavigateToFeed }: HomeScreenProps) {
  const { rescheduledCalls } = useRescheduledCalls();
  
  // Get a rotating hint based on time
  const currentHint = pitchHints[Math.floor(Date.now() / 60000) % pitchHints.length];

  const formatScheduledDate = (date: Date) => {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'MMM d');
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-5 pt-12 pb-4">
        <p className="text-muted-foreground text-sm font-light">Good morning</p>
        <h1 className="text-2xl font-semibold text-foreground mt-1">Plan Your Day</h1>
      </div>

      <div className="px-5 space-y-6">
        {/* AI Plan Card */}
        <div className="bg-card rounded-2xl p-5 border border-border/50">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <h2 className="font-medium text-foreground">Today's AI Plan</h2>
          </div>
          
          <ul className="space-y-3">
            {aiPlanPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-sm text-muted-foreground font-light leading-relaxed">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Rescheduled Calls */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-medium text-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              Upcoming Calls
            </h2>
            <span className="text-xs text-muted-foreground">{rescheduledCalls.length} scheduled</span>
          </div>

          {rescheduledCalls.length === 0 ? (
            <div className="bg-muted/30 rounded-xl p-6 text-center">
              <p className="text-muted-foreground text-sm font-light">No scheduled calls yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {rescheduledCalls.map((call) => (
                <div 
                  key={call.id}
                  className="bg-card rounded-xl p-4 border border-border/50 flex items-center justify-between"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm truncate">
                      {call.prospectName}
                    </p>
                    <p className="text-xs text-muted-foreground font-light mt-0.5">
                      {call.company}
                    </p>
                    <p className="text-xs text-primary mt-1">
                      {formatScheduledDate(call.scheduledDate)} · {call.scheduledTime}
                    </p>
                  </div>
                  
                  <button className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors ml-3 flex-shrink-0">
                    <Phone className="w-4 h-4 text-primary" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* From the Team */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-medium text-foreground flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              From the Team
            </h2>
          </div>
          
          <button 
            onClick={onNavigateToFeed}
            className="w-full text-left bg-card rounded-xl p-4 border border-border/50 hover:border-border transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <p className="text-sm font-medium text-foreground">{featuredPost.author}</p>
              <span className="text-xs text-muted-foreground">·</span>
              <p className="text-xs text-muted-foreground">{featuredPost.role}</p>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary ml-auto">
                {featuredPost.outcome}
              </span>
            </div>
            <p className="text-sm text-foreground font-medium mb-1.5">{featuredPost.title}</p>
            <p className="text-sm text-muted-foreground font-light line-clamp-2">{featuredPost.excerpt}</p>
            <div className="flex items-center gap-1 mt-3 text-xs text-primary">
              <span>Read more</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </button>
        </div>

        {/* AI Pitch Hint */}
        <div className="bg-ai-hint/8 rounded-xl p-4 border border-ai-hint/20">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-md bg-ai-hint/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Sparkles className="w-3 h-3 text-ai-hint" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-ai-hint font-medium uppercase tracking-wide mb-1">
                Pitch Tip
              </p>
              <p className="text-sm text-foreground font-light leading-relaxed">
                {currentHint}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-ai-hint/50 flex-shrink-0 mt-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
