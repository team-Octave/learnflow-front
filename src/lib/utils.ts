import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
