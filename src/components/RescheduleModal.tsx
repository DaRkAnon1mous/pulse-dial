import { useState } from 'react';
import { X, Check, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface RescheduleModalProps {
  prospectName: string;
  onSave: (date: Date, time: string, note: string) => void;
  onCancel: () => void;
}

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
  '6:00 PM', '6:30 PM', '7:00 PM',
];

export function RescheduleModal({ prospectName, onSave, onCancel }: RescheduleModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [note, setNote] = useState('');
  const [dateOpen, setDateOpen] = useState(false);

  const handleSave = () => {
    if (selectedDate && selectedTime) {
      onSave(selectedDate, selectedTime, note);
    }
  };

  const isValid = selectedDate && selectedTime;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-[430px] bg-background rounded-t-3xl p-5 pb-8 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Reschedule Call</h2>
          <button 
            onClick={onCancel}
            className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Prospect Name */}
        <p className="text-sm text-muted-foreground mb-6">
          Schedule a callback with <span className="text-foreground font-medium">{prospectName}</span>
        </p>

        {/* Date Picker */}
        <div className="mb-5">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-2">
            Date
          </label>
          <Popover open={dateOpen} onOpenChange={setDateOpen}>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors text-left",
                  selectedDate 
                    ? "border-primary/30 bg-primary/5" 
                    : "border-border bg-card hover:border-primary/20"
                )}
              >
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className={cn(
                  "flex-1 text-sm",
                  selectedDate ? "text-foreground" : "text-muted-foreground"
                )}>
                  {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "Select a date"}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date);
                  setDateOpen(false);
                }}
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time Picker */}
        <div className="mb-5">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-2">
            Time
          </label>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-card">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="flex-1 bg-transparent text-sm text-foreground focus:outline-none appearance-none cursor-pointer"
            >
              <option value="" disabled className="text-muted-foreground">Select a time</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Note */}
        <div className="mb-6">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-2">
            Note (optional)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a reminder note..."
            className="w-full h-20 bg-card border border-border rounded-xl p-3 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={!isValid}
          className={cn(
            "w-full rounded-2xl py-4 px-6 flex items-center justify-center gap-2 font-medium text-base transition-all",
            isValid 
              ? "bg-primary text-primary-foreground shadow-call" 
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          <Check className="w-5 h-5" />
          Schedule Call
        </button>
      </div>
    </div>
  );
}
