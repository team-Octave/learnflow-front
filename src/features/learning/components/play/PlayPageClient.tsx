// src/features/learning/components/play/PlayPageClient.tsx
'use client';

import { useMemo, useState } from 'react';
import type { Lecture } from '@/features/lectures/types';
import { TitleBar } from './TitleBar';
import { Video } from './Video';
import { Quiz } from './Quiz';
import { AsideCurriculum } from './AsideCurriculum';

type Progress = {
  lastCompletedLessonId?: string;
  progressRate?: number;
};

interface PlayPageClientProps {
  lecture: Lecture;
  progress?: Progress;
}

// 실제 강의 수강 화면 (클라이언트)
export function PlayPageClient({ lecture, progress }: PlayPageClientProps) {
  // 모든 레슨 평탄화
  const allLessons = useMemo(
    () => lecture.curriculum.flatMap((ch) => ch.lessons),
    [lecture],
  );

  // 초기 레슨: 요구사항대로 "가장 마지막 완료된 레슨" 또는 첫 번째 레슨
  const initialLesson = useMemo(() => {
    if (allLessons.length === 0) return undefined;

    if (progress?.lastCompletedLessonId) {
      const found = allLessons.find(
        (l) => l.id === progress.lastCompletedLessonId,
      );
      if (found) return found;
    }

    return allLessons[0];
  }, [allLessons, progress?.lastCompletedLessonId]);

  // 👉 현재 선택된 레슨 ID를 상태로 관리
  const [currentLessonId, setCurrentLessonId] = useState(
    initialLesson?.id ?? allLessons[0]?.id,
  );

  const currentLesson =
    allLessons.find((l) => l.id === currentLessonId) ?? allLessons[0];

  // 레슨이 아예 없으면 렌더링 X
  if (!currentLesson) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* 상단 타이틀 바 */}
      <TitleBar lecture={lecture} />

      <div className="container mx-auto flex gap-8 py-8 px-4">
        {/* 메인 영역: 비디오 + 퀴즈 */}
        <main className="flex-1 flex flex-col gap-6">
          <Video lesson={currentLesson} />

          {currentLesson.questions && currentLesson.questions.length > 0 && (
            <Quiz lesson={currentLesson} />
          )}
        </main>

        {/* 오른쪽 사이드 커리큘럼 */}
        <aside className="w-[320px] shrink-0 hidden lg:block">
          <AsideCurriculum
            lecture={lecture}
            currentLessonId={currentLessonId}
            progressRate={progress?.progressRate}
            // 🔥 여기서 레슨 클릭 시 상태 업데이트
            onSelectLesson={setCurrentLessonId}
          />
        </aside>
      </div>
    </div>
  );
}
