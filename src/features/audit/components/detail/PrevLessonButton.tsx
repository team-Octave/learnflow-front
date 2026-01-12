// 이전 레슨 버튼

// src/features/audit/components/detail/PrevLessonButton.tsx
'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

interface Props {
  disabled?: boolean;
  onClick: () => void;
}

export default function PrevLessonButton({ disabled, onClick }: Props) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      disabled={disabled}
      className="w-[140px] border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-primary"
    >
      <ChevronLeft className="w-4 h-4 mr-2" />
      이전 레슨
    </Button>
  );
}
