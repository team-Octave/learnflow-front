// src/features/learning/components/play/Video.tsx
'use client';

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
            completedLessonIds={completedLessonIds}
          />
        </div>
      </div>
    </div>
  );
}
