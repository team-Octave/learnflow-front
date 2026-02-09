// src/features/lectures/components/detail/Lesson.tsx

'use client';

import { PlayCircle, FileQuestion } from 'lucide-react';
import type { Lesson as LessonType } from '../../types';

interface LessonProps {
  lesson: LessonType;
  isActive?: boolean;
  onClick?: () => void; // VIDEO만 내려옴
}

export default function Lesson({
  lesson,
  isActive = false,
  onClick,
}: LessonProps) {
  const isVideo = lesson.lessonTypeDisplayName === 'VIDEO';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full
        flex items-center justify-between
        p-3 rounded-md
        transition-colors
        text-left
        border
        ${isVideo ? 'cursor-pointer group' : 'cursor-default'}
        border-transparent
        ${isVideo && !isActive ? 'hover:bg-zinc-800/50' : ''}
        ${isActive ? 'bg-indigo-500/10 border-indigo-500/20' : ''}
      `}
    >
      <div className="flex items-center gap-3">
        {isVideo ? (
          <PlayCircle
            className={`w-4 h-4 transition-colors ${
              isActive
                ? 'text-indigo-400'
                : 'text-zinc-500 group-hover:text-indigo-400'
            }`}
          />
        ) : (
          <FileQuestion className="w-4 h-4 text-zinc-500" />
        )}

        <span
          className={`text-sm transition-colors ${
            isActive
              ? 'text-white font-medium' //선택된 레슨인가?
              : isVideo
                ? 'text-zinc-300 group-hover:text-white' //선택 안 됐고, VIDEO 레슨인가?
                : 'text-zinc-300' //선택 안 됐고, VIDEO도 아님 (QUIZ 등)
          }`}
        >
          {lesson.lessonTitle}
        </span>
      </div>
    </button>
  );
}
