// src/features/lectures/components/detail/Lesson.tsx'use client';

import { PlayCircle, FileQuestion, Clock } from 'lucide-react';
import type { Lesson as LessonType } from '../../types';

interface Props {
  lesson: LessonType;
}

export default function Lesson({ lesson }: Props) {
  return (
    <div
      className="flex items-center justify-between p-3 rounded-md hover:bg-zinc-800/50 transition-colors cursor-pointer group"
    >
      {/* Left: Icon + Lesson title */}
      <div className="flex items-center gap-3">
        {lesson.type === 'VIDEO' ? (
          <PlayCircle className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
        ) : (
          <FileQuestion className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
        )}

        <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">
          {lesson.title}
        </span>
      </div>

      {/* Right: Duration OR Quiz Label */}
      <div className="flex items-center gap-2 text-xs text-zinc-500">
        {lesson.type === 'VIDEO' && lesson.duration ? (
          <>
            <Clock className="w-3 h-3" />
            <span>{lesson.duration}</span>
          </>
        ) : (
          <span className="text-indigo-400 font-medium">퀴즈</span>
        )}
      </div>
    </div>
  );
}
