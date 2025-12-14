// src/features/learning/components/play/Video.tsx
'use client';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import ButtonComplete from './ButtonComplete';
import { Lesson } from '@/features/lectures/types';
import { Enrollment } from '../../types';

export interface VideoProps {
  lesson: Lesson;
  enrollmentInfo: Enrollment;
}

export function Video({ lesson, enrollmentInfo }: VideoProps) {
  // 나중에는 lesson.videoUrl 사용:
  // const src = lesson.videoUrl ?? "기본 URL";
  const src =
    lesson.videoUrl ??
    'https://www.youtube.com/embed/Axlxk_PaSOg?si=5mlhFbRzOXnGYtJb';

  return (
    <div className="flex flex-col w-full h-full justify-center items-center p-4 md:p-8 overflow-y-auto custom-scrollbar">
      {/* 영상 영역 */}
      <div className="w-full max-w-5xl">
        <AspectRatio
          ratio={16 / 9}
          className="bg-black border border-zinc-800 rounded-xl overflow-hidden shadow-xl"
        >
          <iframe
            src={src}
            title={lesson.lessonTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </AspectRatio>

        {/* 제목, 수강 완료 버튼 */}
        <div className="flex justify-between w-full">
          <h2 className="text-xl font-semibold text-white mt-6 mb-2 max-w-5xl w-full">
            {lesson.lessonTitle}
          </h2>

          <div className="max-w-5xl w-full flex justify-end mt-4">
            <ButtonComplete
              enrollmentInfo={enrollmentInfo}
              lessonId={lesson.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
