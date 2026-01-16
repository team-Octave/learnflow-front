// src/services/audit.service.ts
// 인증 토큰이 포함된 fetch 래퍼 함수 (관리자 API라서 로그인 + 권한 필요)
import { authFetch } from '@/shared/api';

// 2️⃣ 관리자 강의 검토 목록 페이지 조회
export async function getApprovals(page: number, size: number) {
  const response = await authFetch(
    `/api/v1/admin/approvals?page=${page}&size=${size}`,
    {
      cache: 'no-store', //항상 최신 데이터 요청 ??@@
    },
  );
  return response.json();
}

// 3️⃣ 강의 검토 상세 조회
// lectureId : 수강(enrollmentId)랑 완전히 다른 개념, 감의 검토할 lectureId
export async function getApprovalDetail(lectureId: number) {
  const response = await authFetch(`/api/v1/admin/approvals/${lectureId}`, {
    cache: 'no-store',
  });
  return response.json();
}

// 4️⃣ 강의 승인 / 반려 처리 (PATCH)
export async function patchApprovalStatus(
  lectureId: number, //승인/반려할 강의 ID
  body: {
    status: 'APPROVED' | 'REJECTED';
    rejectCategories?: string[]; // 반려 사유 카테고리 (선택)
    reason?: string; // 반려 상세 사유 (선택)
  },
) {
  //authFetch 호출 (실제 API 요청)
  const response = await authFetch(`/api/v1/admin/approvals/${lectureId}`, {
    method: 'PATCH', //승인 상태만 바꾸는 것
    body: JSON.stringify(body), //S 객체 → JSON 문자열 변환
    cache: 'no-store', //이건 상태 변경 요청이니까 캐싱 개념 자체를 쓰지 마라
  });
  return response.json(); //서버 응답을 JSON으로 파싱해서 그대로 반환
}

// 5️⃣ 관리자 검토 화면에서 레슨 단건 조회
export async function getAdminLessonDetail(
  lectureId: number,
  lessonId: number,
) {
  const response = await authFetch(
    `/api/v1/admin/lectures/${lectureId}/lessons/${lessonId}`,
    { cache: 'no-store' },
  );
  return response.json();
}
