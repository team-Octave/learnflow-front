import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { decodeJwt } from 'jose';

//cn()은 className 문자열 합치기 + Tailwind 충돌 해결을 한 번에 해주는 함수.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// searchParams에서 중복 없으면 해당 값을 반환하는 함수
export function getParam(
  value: string | string[] | undefined,
): string | undefined {
  if (Array.isArray(value)) {
    return value[0]; // 중복 시 첫 번째 값 반환
  }
  return value;
}

export async function convertURLtoFile(
  url: string,
  filename: string,
): Promise<File> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
}

export function checkIsExpired(token: string | undefined): boolean {
  if (!token) return true;

  try {
    const payload = decodeJwt(token);
    if (!payload.exp) return true;

    const now = Math.floor(Date.now() / 1000); // 현재 시간 (초 단위)
    return payload.exp < now + 60; // 만료 1분 전이면 미리 만료된 것으로 간주 (여유 대역폭)
  } catch (error) {
    return true;
  }
}

// 유저의 역할을 토큰에서 추출하는 함수
export function getUserRole(token: string | undefined): string | null {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role; // 토큰에 담긴 role 필드명에 맞춰 수정!
  } catch (e) {
    return null;
  }
}

export function formatDateTime(iso: string) {
  const d = new Date(iso);

  //  날짜도 ko-KR로 (YYYY. M. D. 형태)
  const date = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);

  // 시간은 필요할 때만 쓰면 됨
  const time = new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit', // 2자리 숫자
    minute: '2-digit',
    hour12: false, // 24시간제 사용
  }).format(d);

  return { date, time };
}
