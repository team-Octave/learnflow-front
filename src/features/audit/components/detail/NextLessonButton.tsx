// 다음 레슨 버튼

// src/features/audit/components/detail/NextLessonButton.tsx
'use client';

import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface Props {
  disabled?: boolean;
  onClick: () => void;
}

export default function NextLessonButton({ disabled, onClick }: Props) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      disabled={disabled}
      className="w-[140px] border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-primary"
    >
      다음 레슨
      <ChevronRight className="w-4 h-4 ml-2" />
    </Button>
  );
}
