// src/features/membership/types.ts

export type PaymentStatus = 'completed' | 'failed' | 'pending';

export type Payment = {
  id: string;
  date: string; // "2026-02-01" 같은 형태
  plan: string; // "프리미엄"
  amount: number; // 9900
  status: PaymentStatus;
};

export type MembershipData = {
  hasMembership: boolean;
  planName?: string; // "프리미엄 멤버십"
  nextBillingDate?: string; // "2026-03-01"
  nextBillingAmount?: number; // 9900
  paymentHistory: Payment[];
};
