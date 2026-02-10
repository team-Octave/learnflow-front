// src/features/membership/types.ts
export type PaymentStatus = 'DONE' | 'CANCELED' | 'ABORTED';

export type PaymentHistoryResponse = {
  id: number;
  paymentDate: string; // ISO-8601의 형태
  planType: string; // "프리미엄"
  amount: number; // 9900
  status: PaymentStatus;
};
