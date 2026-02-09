// src/features/membership/actions.ts
'use server';

import type { ActionState } from '@/shared/types/ActionState';
import type { MembershipData } from './types';

function toKoreanDate(dateStr: string) {
  // "2026-03-01" -> "2026년 3월 1일"
  const [y, m, d] = dateStr.split('-').map((v) => parseInt(v, 10));
  return `${y}년 ${m}월 ${d}일`;
}

export async function getMembershipAction(): Promise<
  ActionState<MembershipData>
> {
  const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

  if (useMock) {
    const hasMembership = false; // 여기만 바꾸면 UI 상태 바로 확인 가능

    const data: MembershipData = hasMembership
      ? {
          hasMembership: true,
          planName: '프리미엄 멤버십',
          nextBillingDate: '2026-03-01',
          nextBillingAmount: 9900,
          paymentHistory: [
            {
              id: 'p1',
              date: '2026-02-01',
              plan: '프리미엄',
              amount: 9900,
              status: 'completed',
            },
          ],
        }
      : {
          hasMembership: false,
          paymentHistory: [],
        };

    return { success: true, code: 'SUCCESS', data };
  }

  // TODO: 실제 API 연동 시 여기에서 fetch/authFetch 호출
  // const state = await getMembership();
  // return state;

  return {
    success: false,
    code: 'NOT_IMPLEMENTED',
    message: 'API 연동 전입니다.',
  };
}

export function formatNextBillingText(dateStr?: string, amount?: number) {
  if (!dateStr || !amount) return '';
  return `다음 결제일: ${toKoreanDate(dateStr)} (${amount.toLocaleString()}원)`;
}
