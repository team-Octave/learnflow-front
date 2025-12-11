// src/app/play/[id]/page.tsx
import { notFound } from 'next/navigation';
import {
  getLectureById,
  getLearningProgress,
} from '@/services/lectures.service';

import { TitleBar } from '@/features/learning/components/play/TitleBar';
import { Video } from '@/features/learning/components/play/Video';
import { Quiz } from '@/features/learning/components/play/Quiz';
import { AsideCurriculum } from '@/features/learning/components/play/AsideCurriculum';

export default async function PlayPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // ⬇ async 함수이므로 await 필요
  const lecture = await getLectureById(id);
  if (!lecture) notFound();

  const progress = await getLearningProgress(id);

  const allLessons = lecture.curriculum.flatMap((ch) => ch.lessons);

  let currentLesson = allLessons[0];

  if (progress?.lastCompletedLessonId) {
    const idx = allLessons.findIndex(
      (l) => l.id === progress.lastCompletedLessonId,
    );

    if (idx !== -1) {
      currentLesson = allLessons[idx + 1] || allLessons[idx];
    }
  }

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-zinc-50 overflow-hidden">
      <TitleBar lecture={lecture} />

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 flex flex-col bg-black relative">
          {currentLesson.type === 'QUIZ' ? (
            <Quiz lesson={currentLesson} />
          ) : (
            <Video lesson={currentLesson} />
          )}
        </main>

        <AsideCurriculum lecture={lecture} currentLessonId={currentLesson.id} />
      </div>
    </div>
  );
}
