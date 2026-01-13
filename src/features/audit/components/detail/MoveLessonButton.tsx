// src/features/audit/components/detail/MoveLessonButton.tsx
'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface MoveLessonButtonProps {
  move: 'PREV' | 'NEXT';
  disabled?: boolean;
  onClick: () => void;
}

export default function MoveLessonButton({
  move,
  disabled,
  onClick,
}: MoveLessonButtonProps) {
  const isPrev = move === 'PREV';

  return (
    <Button
      variant="outline"
      onClick={onClick}
      disabled={disabled}
      className="w-[140px] border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-primary"
      aria-label={isPrev ? '이전 레슨' : '다음 레슨'}
    >
      {isPrev ? (
        <>
          <ChevronLeft className="w-4 h-4 mr-2" />
          이전 레슨
        </>
      ) : (
        <>
          다음 레슨
          <ChevronRight className="w-4 h-4 ml-2" />
        </>
      )}
    </Button>
  );
}
