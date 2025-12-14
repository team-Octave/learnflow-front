// src/features/learning/components/play/Video/ButtonComplete.tsx
'use client';

import { useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { completeLessonAction } from '../../actions';
import { Enrollment } from '../../types';

interface ButtonCompleteProps {
  lessonId: string;
  enrollmentInfo: Enrollment;
}

export default function ButtonComplete({
  enrollmentInfo,
  lessonId,
}: ButtonCompleteProps) {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleComplete = async () => {
    startTransition(async () => {
      const response = await completeLessonAction(
        enrollmentInfo.enrollmentId,
        parseInt(lessonId),
      );
      if (!response.success) {
        alert(response.error);
      } else {
        const params = new URLSearchParams(searchParams.toString());
        params.set('lessonId', lessonId);
        router.replace(`${pathname}?${params.toString()}`);
      }
    });
  };

  const isCompleted = enrollmentInfo.completedLessonIds
    ? enrollmentInfo.completedLessonIds.some((cl) => cl === Number(lessonId))
    : false;

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
