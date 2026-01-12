// src/services/audit.service.ts
import { authFetch } from '@/shared/api';
import type { ActionState } from '@/shared/types/ActionState';
import type { AuditDetail, AuditRejectPayload } from '@/features/audit/types';

export async function getAuditDetail(
  id: string,
): Promise<ActionState<AuditDetail>> {
  try {
    const res = await authFetch(`/api/v1/admin/audits/${id}`, {
      method: 'GET',
    });

    if (!res.ok) {
      // 💡 해결책: ActionState 타입이 요구하는 필드(success, message, code)를 모두 채워줍니다.
      return {
        success: false,
        code: `HTTP_${res.status}`, // 코드 필드 추가
        message: `서버 응답 에러 (Status: ${res.status})`,
      };
    }

    const body = await res.json();

    // 백엔드 응답이 성공(true)인 경우
    if (body?.success) {
      return {
        success: true,
        data: body.data,
        message: body.message ?? '성공',
        code: body.code ?? 'SUCCESS', // 💡 code 필드를 추가하세요!
      } as ActionState<AuditDetail>; // 💡 명시적으로 타입을 캐스팅합니다.
    }

    // 백엔드 응답이 실패(false)인 경우
    return {
      success: false,
      code: body?.code ?? 'FETCH_ERROR',
      message: body?.message ?? '데이터를 가져오는데 실패했습니다.',
    };
  } catch (e) {
    console.error('Fetch Error:', e);
    return {
      success: false,
      code: 'NETWORK_ERROR',
      message: '서버 연결에 실패했습니다.',
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
