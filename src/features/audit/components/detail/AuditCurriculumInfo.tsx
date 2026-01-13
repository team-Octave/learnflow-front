// src/features/audit/components/detail/AuditCurriculumInfo.tsx
'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import type { Lecture } from '@/features/lectures/types';
import MoveLessonButton from './MoveLessonButton';
import AuditVideo from './AuditVideo';
import AuditQuizList from './AuditQuizList';

interface AuditCurriculumInfoProps {
  chapters: Lecture['chapters']; // Chapter[] | null
}

type ChapterFromLecture = NonNullable<Lecture['chapters']>[number];
type LessonFromLecture = ChapterFromLecture['lessons'][number];

type FlattenedLesson = LessonFromLecture & {
  chapterTitle: string;
};

export default function AuditCurriculumInfo({
  chapters,
}: AuditCurriculumInfoProps) {
  const safeChapters = chapters ?? [];

  const allLessons: FlattenedLesson[] = safeChapters.flatMap((chapter) =>
    (chapter.lessons ?? []).map((lesson) => ({
      ...lesson,
      chapterTitle: chapter.chapterTitle,
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

  const isQuiz = currentLesson.lessonTypeDisplayName === 'QUIZ';

  return (
    <div className="mt-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between px-1 pt-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-medium text-primary leading-tight">
            {currentLesson.chapterTitle}
          </h3>

          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2 leading-snug">
            {currentLesson.lessonTitle}
            <Badge variant={isQuiz ? 'QUIZ' : 'VIDEO'}>
              {isQuiz ? 'QUIZ' : 'VIDEO'}
            </Badge>
          </h2>
        </div>

        <div className="text-sm font-medium text-zinc-500 pt-1">
          Lesson {currentLessonIndex + 1} of {allLessons.length}
        </div>
      </div>

      {/* Content */}
      {isQuiz ? (
        <AuditQuizList questions={currentLesson.quizQuestions ?? []} />
      ) : (
        <AuditVideo videoUrl={currentLesson.videoUrl} />
      )}

      {/* MoveLessonButton */}
      <div className="flex items-center justify-between pt-2 mb-8">
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
