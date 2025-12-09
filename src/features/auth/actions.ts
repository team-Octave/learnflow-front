// src/features/auth/actions.ts
'use server';

/* ---------------------- 로그인 API ---------------------- */
export async function loginAction(email: string, password: string) {
  try {
    const res = await fetch('http://localhost:8080/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    return data; // { success, code, message, data }
  } catch (error) {
    return {
      success: false,
      code: 'NETWORK_ERROR',
      message: '서버 요청 실패',
      data: null,
    };
  }
}

/* ---------------------- 닉네임 중복 확인 API ---------------------- */
export async function checkNicknameAction(nickname: string) {
  try {
    const res = await fetch(
      `http://localhost:8080/api/v1/users/check?nickname=${nickname}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
      },
    );

    const data = await res.json();

    return {
      success: data.success,
      message: data.message,
      data: data.data, // true = 중복, false = 사용 가능
    };
  } catch (error) {
    return {
      success: false,
      message: '닉네임 중복 확인 중 오류가 발생했습니다.',
      data: null,
    };
  }
}

/* ---------------------- 회원가입 API ---------------------- */
export async function signupAction(payload: {
  email: string;
  password: string;
  nickname: string;
}) {
  try {
    const res = await fetch('http://localhost:8080/api/v1/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    const data = await res.json();

    return {
      success: data.success,
      code: data.code,
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    return {
      success: false,
      code: 'NETWORK_ERROR',
      message: '서버 요청 실패',
      data: null,
    };
  }
}
