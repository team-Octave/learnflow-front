// src/features/audit/actions.ts
'use server';

import type { ActionState } from '@/shared/types/ActionState';
import type {
  AuditApprovalListApiResponse,
  ApprovalDetail,
  AdminLessonDetail,
  RejectCategory,
} from './types';

import {
  getApprovals,
  getApprovalDetail,
  patchApprovalStatus,
  getAdminLessonDetail,
} from '@/services/audit.service';

const PAGE_SIZE = 4;

/**
 * ✅ 강의 검토 목록 조회
 * GET /api/v1/admin/approvals?page=&size=
 *
 * lectures/actions.ts 스타일: 서비스 호출 → 그대로 반환
 */
export async function getApprovalsAction(
  page: number, // 1-based
): Promise<ActionState<AuditApprovalListApiResponse>> {
  const apiPage = Math.max(0, page - 1);
  const state = (await getApprovals(
    apiPage,
    PAGE_SIZE,
  )) as ActionState<AuditApprovalListApiResponse>;

  return state;
}

/**
 * ✅ 강의 검토 상세 조회(챕터/레슨 목록)
 * GET /api/v1/admin/approvals/{lectureId}
 */
export async function getAuditDetailAction(
  lectureId: number,
): Promise<ActionState<ApprovalDetail>> {
  const state = (await getApprovalDetail(
    lectureId,
  )) as ActionState<ApprovalDetail>;
  return state;
}

/**
 * ✅ 관리자 레슨 상세 조회(영상/퀴즈)
 * GET /api/... (admin lesson detail)
 */
export async function getAdminLessonDetailAction(
  lectureId: number,
  lessonId: number,
): Promise<ActionState<AdminLessonDetail>> {
  const state = (await getAdminLessonDetail(
    lectureId,
    lessonId,
  )) as ActionState<AdminLessonDetail>;
  console.log(state);
  return state;
}

/**
 * ✅ 승인
 * PATCH /api/v1/admin/approvals/{lectureId}
 */
export async function approveAuditAction(
  lectureId: number,
): Promise<ActionState<unknown>> {
  const state = (await patchApprovalStatus(lectureId, {
    status: 'APPROVED',
  })) as ActionState<unknown>;

  return state;
}

/**
 * ✅ 반려
 * PATCH /api/v1/admin/approvals/{lectureId}
 */
export async function rejectAuditAction(
  lectureId: number,
  payload: {
    rejectCategories: RejectCategory[];
    reason?: string;
  },
): Promise<ActionState<unknown>> {
  const state = (await patchApprovalStatus(lectureId, {
    status: 'REJECTED',
    rejectCategories: payload.rejectCategories,
    reason: payload.reason,
  })) as ActionState<unknown>;

  return state;
}

// export async function getAuditLecturesAction(
//   page: number,
// ): Promise<ActionState<AuditApprovalListApiResponse>> {
//   return getApprovalsAction(page);
// }
