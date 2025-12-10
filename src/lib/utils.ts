import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
