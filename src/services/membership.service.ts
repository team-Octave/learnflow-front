// 결제내역조회 서비스함수 만들어야함

import { PaymentInfo } from '@/features/membership/types';
import { authFetch } from '@/shared/api';

export async function getPaymentHistory() {
  const response = await authFetch(`/api/v1/payments/history`);
  return response.json();
}

export async function paymentConfirm(paymentInfo: PaymentInfo) {
  const response = await authFetch(`/api/v1/payments/confirm`, {
    method: 'POST',
    body: JSON.stringify(paymentInfo),
  });
  return response.json();
}
