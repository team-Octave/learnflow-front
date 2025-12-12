// ButtonSubmit.tsx
'use client';

import { Button } from '@/components/ui/button';
import type { ReactNode } from 'react';

interface ButtonSubmitProps {
  children: ReactNode; // 버튼 안에 표시할 텍스트
  onClick?: () => void;
  disabled?: boolean;
}

export function ButtonSubmit({
  children,
  onClick,
  disabled,
}: ButtonSubmitProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold px-8 py-6 text-lg cursor-pointer"
    >
      {children} {/* ← 여기서 부모가 넘긴 '제출하기' / '제출 완료' 사용 */}
    </Button>
  );
}
