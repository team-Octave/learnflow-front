// src/features/learning/components/play/Video/ButtonComplete.tsx
'use client';

import { useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { completeLessonAction } from '../../actions';

interface ButtonCompleteProps {
  enrollmentId: number;
  lectureId: number;
  lessonId: number;
  completedLessonIds?: number[];
}

export default function ButtonComplete({
  enrollmentId,
  lectureId,
  lessonId,
  completedLessonIds,
}: ButtonCompleteProps) {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isCompleted = completedLessonIds?.includes(lessonId) ?? false;

  const handleComplete = () => {
    startTransition(async () => {
      const state = await completeLessonAction(
        enrollmentId,
        lectureId,
        lessonId,
      );

      if (state.success) {
        const params = new URLSearchParams(searchParams.toString());
        params.set('lessonId', String(lessonId));
        router.replace(`${pathname}?${params.toString()}`);
        router.refresh(); // ✅ 사이드바/진행률 갱신
      } else {
        alert(state.message || '레슨 완료 처리에 실패하였습니다.');
      }
    });
  };

  return (
    <Button
      disabled={isCompleted || isPending}
      onClick={handleComplete}
      className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold px-8 py-6 text-lg cursor-pointer"
    >
      {isPending ? '처리 중...' : isCompleted ? '수강 완료됨' : '수강 완료'}
    </Button>
  );
}
