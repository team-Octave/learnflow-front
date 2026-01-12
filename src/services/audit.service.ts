// src/services/audit.service.ts
import { authFetch } from '@/shared/api';
import type { ActionState } from '@/shared/types/ActionState';
import type { AuditDetail, AuditRejectPayload } from '@/features/audit/types';

export async function getAuditDetail(
  id: string,
): Promise<ActionState<AuditDetail>> {
  try {
    // ✅ 필요 시 endpoint 수정
    const res = await authFetch(`/api/v1/admin/audits/${id}`, {
      method: 'GET',
    });
    const body = await res.json();

    if (!res.ok || !body?.success) {
      return {
        success: false,
        code: body?.code ?? 'AUDIT_DETAIL_FAILED',
        message: body?.message ?? '강의 정보를 불러오지 못했습니다.',
      };
    }

    return body as ActionState<AuditDetail>;
  } catch (e) {
    return {
      success: false,
      code: 'AUDIT_DETAIL_ERROR',
      message: '서버 요청에 실패했습니다.',
    };
  }
}

export async function approveAudit(id: string): Promise<ActionState<null>> {
  try {
    // ✅ 필요 시 endpoint 수정
    const res = await authFetch(`/api/v1/admin/audits/${id}/approve`, {
      method: 'POST',
    });
    const body = await res.json();

    if (!res.ok || !body?.success) {
      return {
        success: false,
        code: body?.code ?? 'AUDIT_APPROVE_FAILED',
        message: body?.message ?? '승인에 실패했습니다.',
      };
    }

    return body as ActionState<null>;
  } catch {
    return {
      success: false,
      code: 'AUDIT_APPROVE_ERROR',
      message: '서버 요청에 실패했습니다.',
    };
  }
}

export async function rejectAudit(
  id: string,
  payload: AuditRejectPayload,
): Promise<ActionState<null>> {
  try {
    // ✅ 필요 시 endpoint 수정
    const res = await authFetch(`/api/v1/admin/audits/${id}/reject`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    const body = await res.json();

    if (!res.ok || !body?.success) {
      return {
        success: false,
        code: body?.code ?? 'AUDIT_REJECT_FAILED',
        message: body?.message ?? '반려에 실패했습니다.',
      };
    }

    return body as ActionState<null>;
  } catch {
    return {
      success: false,
      code: 'AUDIT_REJECT_ERROR',
      message: '서버 요청에 실패했습니다.',
    };
  }
}
