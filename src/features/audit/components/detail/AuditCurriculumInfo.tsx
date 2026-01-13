// src/features/audit/components/detail/AuditCurriculumInfo.tsx
'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import type { AuditChapter, AuditLesson } from '@/features/audit/types';
import MoveLessonButton from './MoveLessonButton';
import AuditVideo from './AuditVideo';
import AuditQuizList from './AuditQuizList';

interface AuditCurriculumInfoProps {
  chapters: AuditChapter[];
}

type FlattenedLesson = AuditLesson & {
  chapterTitle: string;
};

export default function AuditCurriculumInfo({
  chapters,
}: AuditCurriculumInfoProps) {
  const allLessons: FlattenedLesson[] = (chapters ?? []).flatMap((chapter) =>
    (chapter.lessons ?? []).map((lesson) => ({
      ...lesson,
      chapterTitle: chapter.title,
    })),
  );

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  const currentLesson = allLessons[currentLessonIndex];

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

      {/* MoveLessonButton */}
      <div className="flex items-center justify-between pt-2">
        <MoveLessonButton
          move="PREV"
          disabled={isFirst}
          onClick={() => setCurrentLessonIndex((prev) => Math.max(0, prev - 1))}
        />
        <MoveLessonButton
          move="NEXT"
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
