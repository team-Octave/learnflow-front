// 결제내역조회 서비스함수 만들어야함

import { authFetch } from '@/shared/api';

export async function getPaymentHistory() {
  const response = await authFetch(`/api/v1/payments/history`);
  return response.json();
}
