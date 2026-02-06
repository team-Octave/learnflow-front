// src/features/lectures/components/detail/Lesson.tsx;

'use client';

import { PlayCircle, FileQuestion } from 'lucide-react';
import type { Lesson as LessonType } from '../../types';

interface Props {
  lesson: LessonType;
  isActive?: boolean;
  onClick?: () => void;
}

export default function Lesson({ lesson, isActive = false, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full
        flex items-center justify-between
        p-3 rounded-md
        transition-colors
        cursor-pointer
        group
        text-left
        ${
          isActive
            ? 'bg-indigo-500/10 border border-indigo-500/20'
            : 'hover:bg-zinc-800/50'
        }
      `}
    >
      {/* Left: Icon + Lesson title */}
      <div className="flex items-center gap-3">
        {lesson.lessonTypeDisplayName === 'VIDEO' ? (
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
