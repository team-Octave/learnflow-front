// src/features/audit/components/detail/MoveLessonButton.tsx
'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/shared/utils';
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
      aria-label={isPrev ? '이전 레슨' : '다음 레슨'}
      className="w-[120px]
        border-zinc-200 dark:border-zinc-800
        hover:bg-zinc-100 dark:hover:bg-zinc-800
        hover:text-primary
        cursor-pointer
      "
    >
      {isPrev ? (
        <div className="flex items-center gap-2 pr-2">
          <ChevronLeft
            className="w-auto h-4  inline-block
                        shrink-0
                        align-middle"
          />
          <span>이전 레슨</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 pl-2">
          <span>다음 레슨</span>
          <ChevronRight
            className="w-auto h-4  inline-block
    shrink-0
    align-middle"
          />
        </div>
      )}
    </Button>
  );
}
