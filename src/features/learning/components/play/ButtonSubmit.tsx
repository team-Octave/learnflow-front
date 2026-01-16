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
      className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-emerald-600
        text-white font-bold px-8 py-6 text-lg cursor-pointer
      " //disabled일 때 커서/hover가 자연스럽게 보이도록 수정
    >
      {children} {/* ← 여기서 부모가 넘긴 '제출하기' / '제출 완료' 사용 */}
    </Button>
  );
}
