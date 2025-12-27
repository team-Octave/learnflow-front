'use server';

import { checkNickname, signup } from '@/services/user.service';
import { ActionState } from '@/shared/types/ActionState';

export async function signupAction(
  user: SignupRequest,
): Promise<ActionState<any>> {
  const state = await signup(user);
  return state;
}

export async function checkNicknameAction(
  nickname: string,
): Promise<ActionState<any>> {
  const state = await checkNickname(nickname);
  return state;
}
