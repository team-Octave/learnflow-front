//  레슨 + 수강정보   API 동시 호출

// app/play/[enrollmentId]/[lectureId]/page.tsx
import { notFound, redirect } from 'next/navigation';

import { Video } from '@/features/learning/components/play/Video';
import { Quiz } from '@/features/learning/components/play/Quiz';

import { getLessonByIdAction } from '@/features/lectures/actions';
import { getEnrollmentByIdAction } from '@/features/learning/actions';

import type { Lesson } from '@/features/lectures/types';
import type { Enrollment } from '@/features/learning/types';

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

  const [lessonState, enrollmentState] = await Promise.all([
    getLessonByIdAction(parseInt(lectureId), parseInt(lessonId)),
    getEnrollmentByIdAction(parseInt(enrollmentId)),
  ]);

  if (!lessonState?.success || !lessonState.data) {
    console.error('[PlayPage] lesson load failed:', lessonState?.message);
    return notFound();
  }

  if (!enrollmentState?.success || !enrollmentState.data) {
    console.error(
      '[PlayPage] enrollment load failed:',
      enrollmentState?.message,
    );
    redirect('/mylearning');
  }

  const currentLesson = lessonState.data as Lesson;
  const enrollmentInfo = enrollmentState.data as Enrollment;

  const isCompleted = enrollmentInfo.completedLessonIds.includes(
    parseInt(lessonId),
  );

  return (
    <main className="flex-1 flex items-center">
      {currentLesson.lessonTypeDisplayName === 'VIDEO' ? (
        <Video
          enrollmentId={parseInt(enrollmentId)}
          lectureId={parseInt(lectureId)}
          lesson={currentLesson}
          completedLessonIds={enrollmentInfo.completedLessonIds}
        />
      ) : (
        <Quiz
          enrollmentId={parseInt(enrollmentId)}
          lectureId={parseInt(lectureId)}
          lesson={currentLesson}
          isCompleted={isCompleted}
        />
      )}
    </main>
  );
}
