import { createContext, useContext, useState, ReactNode } from 'react';
import { RescheduledCall } from '@/types/rescheduledCall';

interface RescheduledCallsContextType {
  rescheduledCalls: RescheduledCall[];
  addRescheduledCall: (call: RescheduledCall) => void;
  removeRescheduledCall: (id: string) => void;
}

const RescheduledCallsContext = createContext<RescheduledCallsContextType | undefined>(undefined);

export function RescheduledCallsProvider({ children }: { children: ReactNode }) {
  const [rescheduledCalls, setRescheduledCalls] = useState<RescheduledCall[]>([
    // Mock data for demo
    {
      id: '1',
      prospectId: '2',
      prospectName: 'Rahul Kapoor',
      company: 'FinStack',
      phone: '+91 99887 76655',
      scheduledDate: new Date(Date.now() + 2 * 60 * 60 * 1000),
      scheduledTime: '3:00 PM',
      note: 'Follow up on pricing discussion',
      createdAt: new Date(),
    },
    {
      id: '2',
      prospectId: '3',
      prospectName: 'Ananya Mehta',
      company: 'CloudNine Solutions',
      phone: '+91 88776 54321',
      scheduledDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      scheduledTime: '11:00 AM',
      createdAt: new Date(),
    },
  ]);

  const addRescheduledCall = (call: RescheduledCall) => {
    setRescheduledCalls(prev => [...prev, call]);
  };

  const removeRescheduledCall = (id: string) => {
    setRescheduledCalls(prev => prev.filter(call => call.id !== id));
  };

  return (
    <RescheduledCallsContext.Provider value={{ rescheduledCalls, addRescheduledCall, removeRescheduledCall }}>
      {children}
    </RescheduledCallsContext.Provider>
  );
}

export function useRescheduledCalls() {
  const context = useContext(RescheduledCallsContext);
  if (!context) {
    throw new Error('useRescheduledCalls must be used within a RescheduledCallsProvider');
  }
  return context;
}
