// 강의 검토 상세 페이지에서 커리큘럼 정보
// Figma 상 Chapter 1. 리액트 시작하기 부터 다음 레슨 버튼 까지 포함.

// src/features/audit/components/detail/AuditCurriculumInfo.tsx
'use client';

import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import type { AuditChapter, AuditLesson } from '@/features/audit/types';
import PrevLessonButton from './PrevLessonButton';
import NextLessonButton from './NextLessonButton';
import AuditVideo from './AuditVideo';
import AuditQuizList from './AuditQuizList';

export default function AuditCurriculumInfo({
  chapters,
}: {
  chapters: AuditChapter[];
}) {
  const allLessons = useMemo(() => {
    return (chapters ?? []).flatMap((chapter) =>
      (chapter.lessons ?? []).map((lesson) => ({
        ...lesson,
        chapterTitle: chapter.title,
      })),
    );
  }, [chapters]);

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  const currentLesson = allLessons[currentLessonIndex] as
    | (AuditLesson & {
        chapterTitle: string;
      })
    | undefined;

  const isFirst = currentLessonIndex === 0;
  const isLast = currentLessonIndex === allLessons.length - 1;

  if (!allLessons.length || !currentLesson) {
    return (
      <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-500">
        커리큘럼 정보가 없습니다.
      </div>
    );
  }

  const isQuiz = currentLesson.type === 'QUIZ';

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-primary">
            {currentLesson.chapterTitle}
          </h3>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
            {currentLesson.title}
            <Badge variant="outline">{isQuiz ? 'QUIZ' : 'VIDEO'}</Badge>
          </h2>
        </div>

        <div className="text-sm font-medium text-zinc-500">
          Lesson {currentLessonIndex + 1} of {allLessons.length}
        </div>
      </div>

      {/* Content */}
      {isQuiz ? (
        <AuditQuizList questions={currentLesson.questions} />
      ) : (
        <AuditVideo videoUrl={currentLesson.videoUrl} />
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        <PrevLessonButton
          disabled={isFirst}
          onClick={() => setCurrentLessonIndex((prev) => Math.max(0, prev - 1))}
        />
        <NextLessonButton
          disabled={isLast}
          onClick={() =>
            setCurrentLessonIndex((prev) =>
              Math.min(allLessons.length - 1, prev + 1),
            )
          }
        />
      </div>
    </div>
  );
}
