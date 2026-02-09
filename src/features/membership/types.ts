// src/features/membership/types.ts

export type PaymentStatus = 'DONE' | 'CANCELED' | 'ABORTED';

export type PaymentHistory = {
  paymentDate: string; // ISO-8601의 형태
  planType: string; // "1개월"
  amount: number; // 9900
  status: PaymentStatus;
};

export type MembershipInfo = {
  nextBillingDate?: string;
  nextBillingAmount?: number;
  paymentHistory?: Array<{
    id: string;
    date: string;
    plan: string;
    amount: number;
    status: string;
  }>;
  membershipExpiryDate?: string;
};
