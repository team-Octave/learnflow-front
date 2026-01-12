// src/features/audit/actions.ts
'use server';

import type { ActionState } from '@/shared/types/ActionState';
import type { AuditDetail, AuditRejectPayload } from '@/features/audit/types';
import {
  approveAudit,
  getAuditDetail,
  rejectAudit,
} from '@/services/audit.service';

export async function getAuditDetailAction(
  id: string,
): Promise<ActionState<AuditDetail>> {
  return getAuditDetail(id);
}

export async function approveAuditAction(
  id: string,
): Promise<ActionState<null>> {
  return approveAudit(id);
}

export async function rejectAuditAction(
  id: string,
  payload: AuditRejectPayload,
): Promise<ActionState<null>> {
  return rejectAudit(id, payload);
}
