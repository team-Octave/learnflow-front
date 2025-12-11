import { commonFetch } from '@/lib/api';

export async function checkNickname(nickname: string) {
  const response = await commonFetch(
    `/api/v1/users/check?nickname=${nickname}`,
  );
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message || '닉네임 중복 확인 실패');
  }
}

export async function signup(user: SignupRequest) {
  const response = await commonFetch(`/api/v1/users`, {
    method: 'POST',
    body: JSON.stringify(user),
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message || '회원 가입 실패');
  }
}
