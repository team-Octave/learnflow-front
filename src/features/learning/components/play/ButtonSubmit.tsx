// ButtonSubmit.tsx
'use client';

import { Button } from '@/components/ui/button';
import type { ReactNode } from 'react';

interface ButtonSubmitProps {
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export function ButtonSubmit({ onClick, disabled }: ButtonSubmitProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold px-8 py-6 text-lg"
    >
      {disabled ? '제출 완료' : '제출하기'}
    </Button>
  );
}
