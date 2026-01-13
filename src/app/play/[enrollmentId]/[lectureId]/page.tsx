// app/play/[enrollmentId]/[lectureId]/page.tsx
import { notFound, redirect } from 'next/navigation';

import { Video } from '@/features/learning/components/play/Video';
import { Quiz } from '@/features/learning/components/play/Quiz';

import { getLessonByIdAction } from '@/features/lectures/actions';
import type { Lesson } from '@/features/lectures/types';

interface PlayPageProps {
  params: Promise<{ enrollmentId: string; lectureId: string }>;
  searchParams: Promise<{ lessonId?: string }>;
}

export default async function PlayPage({
  params,
  searchParams,
}: PlayPageProps) {
  const { enrollmentId, lectureId } = await params;
  const { lessonId } = await searchParams;

  if (!enrollmentId || !lectureId || !lessonId) {
    redirect('/mylearning');
  }

  const lectureIdNum = parseInt(lectureId, 10);
  const lessonIdNum = parseInt(lessonId, 10);

  if (Number.isNaN(lectureIdNum) || Number.isNaN(lessonIdNum)) {
    redirect('/mylearning');
  }

  // ✅ 여기서 레슨 정보만 불러오는 API 호출 (V2)
  const lessonState = await getLessonByIdAction(lectureIdNum, lessonIdNum);

  if (!lessonState?.success || !lessonState.data) {
    console.error('[PlayPage] lesson load failed:', lessonState?.message);
    return notFound();
  }

  const currentLesson = lessonState.data as Lesson;

  return (
    <main className="flex-1 flex items-center">
      {currentLesson.lessonTypeDisplayName === 'VIDEO' ? (
        <Video lesson={currentLesson} />
      ) : (
        <Quiz lesson={currentLesson} />
      )}
    </main>
  );
}
