// src/features/learning/components/play/Video.tsx
'use client';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import ButtonComplete from './ButtonComplete';

interface VideoProps {
  lesson: {
    id: string;
    title: string;
    // videoUrl: string; // YouTube embed URL
    videoUrl: 'https://www.youtube.com/embed/Axlxk_PaSOg?si=5mlhFbRzOXnGYtJb';
    duration?: string;
  };
}

export function Video({ lesson }: VideoProps) {
  return (
    <div className="flex flex-col w-full h-full justify-start items-center p-4 md:p-8 overflow-y-auto custom-scrollbar">
      {/* 영상 영역 */}
      <div className="w-full max-w-5xl">
        <AspectRatio
          ratio={16 / 9}
          className="bg-black border border-zinc-800 rounded-xl overflow-hidden shadow-xl"
        >
          <iframe
            src={lesson.videoUrl}
            title={lesson.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
          {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/Axlxk_PaSOg?si=5mlhFbRzOXnGYtJb" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
        </AspectRatio>
      </div>

      {/* 제목 */}
      <h2 className="text-xl font-semibold text-white mt-6 mb-2 max-w-5xl w-full">
        {lesson.title}
      </h2>

      {/* 수강 완료 버튼 */}
      <div className="max-w-5xl w-full flex justify-end mt-4">
        <ButtonComplete lessonId={lesson.id} />
      </div>
    </div>
  );
}
