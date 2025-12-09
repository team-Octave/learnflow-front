import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

//cn()은 className 문자열 합치기 + Tailwind 충돌 해결을 한 번에 해주는 함수.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
