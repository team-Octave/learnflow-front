'use server';
// src/features/audit/actions.ts
// 강의 검토(audit) 관련 액션 함수 모음

import type { ActionState } from '@/shared/types/ActionState';
import type { Lecture } from '@/features/lectures/types';
import {
  getAuditDetail,
  approveAudit,
  rejectAudit,
} from '@/services/audit.service';

export async function getAuditDetailAction(
  auditId: string,
): Promise<ActionState<Lecture>> {
  const state = await getAuditDetail(auditId);
  return state;
}

export async function approveAuditAction(
  auditId: string,
): Promise<ActionState<null>> {
  const state = await approveAudit(auditId);
  return state;
}

export async function rejectAuditAction(
  auditId: string,
  payload: {
    reasons: string[];
    detail?: string;
  },
): Promise<ActionState<null>> {
  const state = await rejectAudit(auditId, payload);
  return state;
}
