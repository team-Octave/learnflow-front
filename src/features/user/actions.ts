'use server';

import { commonFetch } from '@/shared/api';
import { checkNickname, signup } from '@/services/user.service';
import { Action } from 'sonner';

interface ActionState {
  success: boolean;
  error?: string;
}

export async function signupAction(user: SignupRequest): Promise<ActionState> {
  try {
    await signup(user);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '회원가입 실패',
    };
  }
}

export async function checkNicknameAction(
  nickname: string,
): Promise<ActionState> {
  try {
    await checkNickname(nickname);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '닉네임 중복 확인 실패',
    };
  }
}
