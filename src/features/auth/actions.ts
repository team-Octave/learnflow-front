'use server';

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
