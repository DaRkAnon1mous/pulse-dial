import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { z } from 'zod';

const postSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  situation: z.string().trim().min(1, 'Situation is required').max(500, 'Situation must be less than 500 characters'),
  handling: z.string().trim().min(1, 'This field is required').max(500, 'Must be less than 500 characters'),
  learning: z.string().trim().min(1, 'Learning is required').max(500, 'Learning must be less than 500 characters'),
  outcome: z.enum(['Converted', 'Rescheduled', 'Lost']),
});

export type NewPost = z.infer<typeof postSchema>;

interface ComposePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: NewPost) => void;
}

export function ComposePostModal({ isOpen, onClose, onSubmit }: ComposePostModalProps) {
  const [title, setTitle] = useState('');
  const [situation, setSituation] = useState('');
  const [handling, setHandling] = useState('');
  const [learning, setLearning] = useState('');
  const [outcome, setOutcome] = useState<'Converted' | 'Rescheduled' | 'Lost'>('Converted');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = () => {
    const result = postSchema.safeParse({ title, situation, handling, learning, outcome });
    
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    onSubmit(result.data);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle('');
    setSituation('');
    setHandling('');
    setLearning('');
    setOutcome('Converted');
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  const outcomes: Array<'Converted' | 'Rescheduled' | 'Lost'> = ['Converted', 'Rescheduled', 'Lost'];

  const getOutcomeStyles = (o: typeof outcome, isSelected: boolean) => {
    if (!isSelected) return 'bg-muted/50 text-muted-foreground';
    switch (o) {
      case 'Converted':
        return 'bg-primary text-primary-foreground';
      case 'Rescheduled':
        return 'bg-ai-hint text-white';
      case 'Lost':
        return 'bg-muted-foreground text-white';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 animate-fade-in"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-[430px] bg-background rounded-t-3xl animate-slide-up max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border/50">
          <h2 className="text-lg font-semibold text-foreground">Share Your Experience</h2>
          <button 
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-foreground">
              Title
            </Label>
            <Input
              id="title"
              placeholder="e.g., How I handled a pricing objection"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              className="bg-muted/30 border-border/50"
            />
            {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
          </div>

          {/* Situation */}
          <div className="space-y-2">
            <Label htmlFor="situation" className="text-sm font-medium text-foreground">
              The Situation
            </Label>
            <Textarea
              id="situation"
              placeholder="Describe the context and what happened..."
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              maxLength={500}
              className="bg-muted/30 border-border/50 min-h-[80px] resize-none"
            />
            {errors.situation && <p className="text-xs text-destructive">{errors.situation}</p>}
          </div>

          {/* How I handled it */}
          <div className="space-y-2">
            <Label htmlFor="handling" className="text-sm font-medium text-foreground">
              How I Handled It
            </Label>
            <Textarea
              id="handling"
              placeholder="What did you say or do?"
              value={handling}
              onChange={(e) => setHandling(e.target.value)}
              maxLength={500}
              className="bg-muted/30 border-border/50 min-h-[80px] resize-none"
            />
            {errors.handling && <p className="text-xs text-destructive">{errors.handling}</p>}
          </div>

          {/* Learning */}
          <div className="space-y-2">
            <Label htmlFor="learning" className="text-sm font-medium text-foreground">
              Key Learning
            </Label>
            <Textarea
              id="learning"
              placeholder="What worked, what did you learn?"
              value={learning}
              onChange={(e) => setLearning(e.target.value)}
              maxLength={500}
              className="bg-muted/30 border-border/50 min-h-[80px] resize-none"
            />
            {errors.learning && <p className="text-xs text-destructive">{errors.learning}</p>}
          </div>

          {/* Outcome */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Outcome</Label>
            <div className="flex gap-2">
              {outcomes.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => setOutcome(o)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${getOutcomeStyles(o, outcome === o)}`}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-border/50">
          <Button 
            onClick={handleSubmit}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Share with Team
          </Button>
        </div>
      </div>
    </div>
  );
}
