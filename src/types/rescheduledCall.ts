export interface RescheduledCall {
  id: string;
  prospectId: string;
  prospectName: string;
  company: string;
  phone: string;
  scheduledDate: Date;
  scheduledTime: string;
  note?: string;
  createdAt: Date;
}
