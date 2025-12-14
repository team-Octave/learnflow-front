// src/features/lectures/components/detail/Lesson.tsx'use client';

import { PlayCircle, FileQuestion, Clock } from 'lucide-react';
import type { Lesson as LessonType } from '../../types';

interface Props {
  lesson: LessonType;
}

export default function Lesson({ lesson }: Props) {
  return (
    <div className="flex items-center justify-between p-3 rounded-md hover:bg-zinc-800/50 transition-colors cursor-pointer group">
      {/* Left: Icon + Lesson title */}
      <div className="flex items-center gap-3">
        {lesson.lessonTypeDisplayName === 'VIDEO' ? (
          <PlayCircle className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
        ) : (
          <FileQuestion className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
        )}

        <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">
          {lesson.lessonTitle}
        </span>
      </div>
    </div>
  );
}
