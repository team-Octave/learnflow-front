// src/features/lectures/components/detail/Lesson.tsx

'use client';

import { PlayCircle, FileQuestion } from 'lucide-react';
import type { Lesson as LessonType } from '../../types';

interface LessonProps {
  lesson: LessonType;
  isActive?: boolean;
  onClick?: () => void; // VIDEO만 내려오고 QUIZ는 undefined
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
        group
        text-left
        border
        cursor-pointer
        border-transparent
        hover:bg-zinc-800/50
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
          <FileQuestion
            className={`w-4 h-4 transition-colors ${
              isActive
                ? 'text-indigo-400'
                : 'text-zinc-500 group-hover:text-indigo-400'
            }`}
          />
        )}

        <span
          className={`text-sm transition-colors ${
            isActive
              ? 'text-white font-medium'
              : 'text-zinc-300 group-hover:text-white'
          }`}
        >
          {lesson.lessonTitle}
        </span>
      </div>
    </button>
  );
}
