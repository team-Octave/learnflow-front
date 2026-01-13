// src/features/audit/actions.ts
import type { ActionState } from '@/shared/types/ActionState';
import type { Lecture } from '@/features/lectures/types';
import { getAuditDetail } from '@/services/audit.service';
import { mockAuditDetail } from './mocks/mockAuditDetail';

export async function getAuditDetailAction(
  id: string,
): Promise<ActionState<Lecture>> {
  try {
    const res = await getAuditDetail(id);

    if (res?.success && res?.data) {
      return {
        success: true,
        data: res.data,
        code: res.code ?? 'SUCCESS',
        message: res.message ?? '성공',
      };
    }

    // 백엔드 없을 때
    return {
      success: true,
      data: { ...mockAuditDetail, id },
      code: 'MOCK',
      message: 'mock data',
    };
  } catch {
    return {
      success: true,
      data: { ...mockAuditDetail, id },
      code: 'MOCK',
      message: 'mock data',
    };
  }
}
