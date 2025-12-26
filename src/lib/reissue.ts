const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// 리프레시 토큰으로 엑세스 토큰 재발급 함수
export async function reissue(refreshToken: string) {
  const res = await fetch(`${BASE_URL}/api/v1/auth/reissue`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  const body = await res.json();
  if (!res.ok || !body.success) {
    throw new Error('재발급 실패');
  }

  return body.data.accessToken; // 새 토큰 반환
}
