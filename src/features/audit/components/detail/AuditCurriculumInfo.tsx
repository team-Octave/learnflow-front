'use client';

import { useEffect, useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import MoveLessonButton from './MoveLessonButton';
import AuditVideo from './AuditVideo';
import AuditQuizList from './AuditQuizList';

import type {
  ApprovalChapter,
  AdminLessonDetail,
} from '@/features/audit/types';
import { getAdminLessonDetailAction } from '@/features/audit/actions';

interface AuditCurriculumInfoProps {
  lectureId: number;
  chapters: ApprovalChapter[];
}

interface FlattenedLessonRef {
  lessonId: number;
  order: number;
  chapterTitle: string;
}

export default function AuditCurriculumInfo({
  lectureId,
  chapters,
}: AuditCurriculumInfoProps) {
  const allLessons: FlattenedLessonRef[] = useMemo(() => {
    return (chapters ?? []).flatMap((chapter) =>
      (chapter.lessons ?? []).map((lesson) => ({
        lessonId: lesson.lessonId,
        order: lesson.order,
        chapterTitle: chapter.chapterTitle,
      })),
    );
  }, [chapters]);

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const currentLessonRef = allLessons[currentLessonIndex];

  const [lessonDetail, setLessonDetail] = useState<AdminLessonDetail | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  const isFirst = currentLessonIndex === 0;
  const isLast = currentLessonIndex === allLessons.length - 1;

  useEffect(() => {
    const run = async () => {
      if (!currentLessonRef) return;

      setLoading(true);
      setLessonDetail(null);

      const state = await getAdminLessonDetailAction(
        lectureId,
        currentLessonRef.lessonId,
      );

      if (state.success && state.data) setLessonDetail(state.data);
      setLoading(false);
    };

    run();
  }, [lectureId, currentLessonRef?.lessonId]);

  if (!allLessons.length || !currentLessonRef) {
    return (
      <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-500">
        커리큘럼 정보가 없습니다.
      </div>
    );
  }

  const isQuiz = lessonDetail?.lessonTypeDisplayName === 'QUIZ';

  return (
    <div className="mt-6 space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between px-1 pt-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-medium text-primary leading-tight">
            {currentLessonRef.chapterTitle}
          </h3>

          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2 leading-snug">
            {!loading && (
              <>
                {lessonDetail?.lessonTitle ??
                  `Lesson #${currentLessonRef.lessonId}`}

                <Badge variant={isQuiz ? 'QUIZ' : 'VIDEO'}>
                  {isQuiz ? 'QUIZ' : 'VIDEO'}
                </Badge>
              </>
            )}
          </h2>
        </div>

        <div className="text-sm font-medium text-zinc-500 pt-1">
          Lesson {currentLessonIndex + 1} of {allLessons.length}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="p-6 rounded-lg border aspect-video  border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-500">
          레슨 정보를 불러오는 중...
        </div>
      ) : !lessonDetail ? (
        <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-500">
          레슨 정보를 불러오지 못했습니다.
        </div>
      ) : isQuiz ? (
        <AuditQuizList questions={lessonDetail.quizQuestions ?? []} />
      ) : (
        <AuditVideo videoUrl={lessonDetail.videoUrl} />
      )}

      {/* Move */}
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
