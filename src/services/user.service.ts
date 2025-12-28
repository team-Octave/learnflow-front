import { commonFetch } from '@/shared/api';

export async function checkNickname(nickname: string) {
  const response = await commonFetch(
    `/api/v1/users/check?nickname=${nickname}`,
  );
  return response.json();
}

export async function signup(user: SignupRequest) {
  const response = await commonFetch(`/api/v1/users`, {
    method: 'POST',
    body: JSON.stringify(user),
  });
  return response.json();
}
