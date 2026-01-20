'use client';

import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { completeLessonAction } from '../../actions';
import { toast } from 'sonner';

interface ButtonCompleteProps {
  enrollmentId: number;
  lessonId: number;
  completedLessonIds?: number[];
  onSyncedEnrollment?: (completedLessonIds: number[]) => void; //  추가
}

export default function ButtonComplete({
  enrollmentId,
  lessonId,
  completedLessonIds,
  onSyncedEnrollment,
}: ButtonCompleteProps) {
  const [isPending, startTransition] = useTransition();

  const isCompleted = completedLessonIds?.includes(lessonId) ?? false;

  const handleComplete = () => {
    startTransition(async () => {
      const state = await completeLessonAction(enrollmentId, lessonId);

      if (!state.success) {
        toast.error(state.message || '레슨 완료 처리에 실패하였습니다.');
        return;
      }

      // completeLessonAction이 최신 enrollment를 반환하도록 했으니 여기서 반영
      const next = state.data?.completedLessonIds as number[] | undefined;

      if (next) {
        onSyncedEnrollment?.(next);
      }

      toast.success('수강 완료 처리되었습니다.');
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
