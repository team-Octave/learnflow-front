// src/features/membership/types.ts

export type PaymentStatus = 'DONE' | 'CANCELED' | 'ABORTED';

export type PaymentHistoryResponse = {
  id: number;
  paymentDate: string; // ISO-8601의 형태
  planType: string; // "1개월"
  amount: number; // 9900
  status: PaymentStatus;
};

export type MembershipInfoResponse = {
  nextBillingDate?: string;
  nextBillingAmount?: number;
  membershipExpiryDate?: string;
  paymentHistory?: PaymentHistoryResponse[];
};

