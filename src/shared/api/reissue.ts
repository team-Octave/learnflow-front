const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// 리프레시 토큰으로 엑세스 토큰 재발급 함수
export async function reissue() {
  const res = await fetch(`${BASE_URL}/api/v1/auth/reissue`, {
    method: 'POST',
  });

  const body = await res.json();
  if (!res.ok || !body.success) {
    throw new Error('재발급 실패');
  }

  return body;
}
