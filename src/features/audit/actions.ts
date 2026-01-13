'use server';
// src/features/audit/actions.ts
// 강의 검토(audit) 관련 액션 함수 모음

import type { ActionState } from '@/shared/types/ActionState';
import type { Lecture } from '@/features/lectures/types';
import { mockAuditDetail } from '@/features/audit/mocks/mockAuditDetail';

/**
 * 강의 검토 상세 조회 (mock)
 */
export async function getAuditDetailAction(
  auditId: string,
): Promise<ActionState<Lecture>> {
  // auditId는 현재 mock에서 사용하지 않음
  return {
    success: true,
    data: mockAuditDetail,
    message: 'mock audit detail',
    code: 'MOCK_SUCCESS',
  };
}

/**
 * 강의 승인 (mock)
 */
export async function approveAuditAction(
  auditId: string,
): Promise<ActionState<null>> {
  return {
    success: true,
    data: null,
    message: 'mock approve success',
    code: 'MOCK_SUCCESS',
  };
}

/**
 * 강의 반려 (mock)
 */
export async function rejectAuditAction(
  auditId: string,
  payload: {
    reasons: string[];
    detail?: string;
  },
): Promise<ActionState<null>> {
  return {
    success: true,
    data: null,
    message: 'mock reject success',
    code: 'MOCK_SUCCESS',
  };
}

// import type { ActionState } from '@/shared/types/ActionState';
// import type { Lecture } from '@/features/lectures/types';
// import {
//   getAuditDetail,
//   approveAudit,
//   rejectAudit,
// } from '@/services/audit.service';

// export async function getAuditDetailAction(
//   auditId: string,
// ): Promise<ActionState<Lecture>> {
//   const state = await getAuditDetail(auditId);
//   return state;
// }

// export async function approveAuditAction(
//   auditId: string,
// ): Promise<ActionState<null>> {
//   const state = await approveAudit(auditId);
//   return state;
// }

// export async function rejectAuditAction(
//   auditId: string,
//   payload: {
//     reasons: string[];
//     detail?: string;
//   },
// ): Promise<ActionState<null>> {
//   const state = await rejectAudit(auditId, payload);
//   return state;
// }
