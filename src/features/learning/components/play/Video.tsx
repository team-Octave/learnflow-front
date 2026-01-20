'use client';

import { useEffect, useState } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import type { Lesson } from '@/features/lectures/types';
import ButtonComplete from './ButtonComplete';

export interface VideoProps {
  enrollmentId: number;
  lesson: Lesson;
  completedLessonIds: number[];
}

export function Video({
  enrollmentId,
  lesson,
  completedLessonIds,
}: VideoProps) {
  const src = lesson.videoUrl;

  // prop으로 받은 completedLessonIds를 로컬 state로 관리
  const [doneIds, setDoneIds] = useState<number[]>(completedLessonIds);

  // lesson 바뀌거나(= 다른 레슨으로 이동) 서버에서 내려준 값이 바뀌면 state 동기화
  useEffect(() => {
    setDoneIds(completedLessonIds);
  }, [completedLessonIds, lesson.id]);

  return (
    <div className="flex flex-col w-full h-full justify-center items-center p-4 md:p-8 overflow-y-auto">
      <div className="w-full max-w-5xl">
        <AspectRatio
          ratio={16 / 9}
          className="bg-black border border-zinc-800 rounded-xl overflow-hidden shadow-xl"
        >
          <video controls className="w-full">
            <source src={src ?? ''} />
          </video>
        </AspectRatio>

        <div className="flex justify-between w-full items-center mt-6">
          <h2 className="text-xl font-semibold text-white">
            {lesson.lessonTitle}
          </h2>

          <ButtonComplete
            enrollmentId={enrollmentId}
            lessonId={lesson.id}
            completedLessonIds={doneIds}
            //  완료 성공 시 최신 completedLessonIds로 업데이트
            onSyncedEnrollment={(nextCompletedLessonIds) => {
              setDoneIds(nextCompletedLessonIds);
            }}
          />
        </div>
      </div>
    </div>
  );
}
