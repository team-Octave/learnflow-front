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

export default async function PlayPage({ params }) {
  const { id } = await params;
  const lecture = getLectureById(id);
  if (!lecture) notFound();

  const allLessons = lecture.curriculum.flatMap((ch) => ch.lessons);

  let currentLesson;

  // localStorage → 마지막 완료된 레슨 ID 가져오기
  let lastCompletedLessonId = null;

  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('completedLessons');
    if (stored) {
      try {
        const arr = JSON.parse(stored);
        lastCompletedLessonId = arr[arr.length - 1] || null;
      } catch {}
    }
  }

  // 이어보기
  if (lastCompletedLessonId) {
    const lastIndex = allLessons.findIndex(
      (l) => l.id === lastCompletedLessonId,
    );

    if (lastIndex !== -1 && allLessons[lastIndex + 1]) {
      currentLesson = allLessons[lastIndex + 1];
    } else {
      currentLesson = allLessons[lastIndex];
    }
  }

  // 처음 시작
  if (!currentLesson) {
    currentLesson = allLessons[0];
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
