// src/features/learning/components/play/ButtonComplete.tsx
'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { completeLessonAction } from '../../actions';

interface ButtonCompleteProps {
  enrollmentId: number;
  lessonId: number;
  completedLessonIds?: number[];
}

export default function ButtonComplete({
  enrollmentId,
  lessonId,
  completedLessonIds,
}: ButtonCompleteProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const isCompleted = completedLessonIds?.includes(lessonId) ?? false;

  const handleComplete = () => {
    if (isCompleted) return;

    startTransition(async () => {
      const state = await completeLessonAction(enrollmentId, lessonId);

      if (!state.success) {
        alert(state.message || '레슨 완료 처리에 실패하였습니다.');
        return;
      }

      // ✅ 핵심: enrollment 최신 상태 다시 가져오게 함
      router.refresh();
    });
  };

  return (
    <Button
      disabled={isCompleted || isPending}
      onClick={handleComplete}
      className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold px-8 py-6 text-lg cursor-pointer"
    >
      {isPending ? '처리 중...' : '수강 완료'}
    </Button>
  );
}
