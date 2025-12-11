// features/learning/components/play/AsideCurriculum/AsideLesson.tsx

import { cn } from '@/lib/utils';
import { PlayCircle, PencilLine, CheckCircle } from 'lucide-react';

type LessonType = 'VIDEO' | 'QUIZ';

interface AsideLessonProps {
  lesson: {
    id: string;
    title: string;
    duration?: string;
    type: LessonType;
  };
  isActive: boolean;
  isCompleted: boolean;
  onClick?: () => void;
}

export function AsideLesson({
  lesson,
  isActive,
  isCompleted,
  onClick,
}: AsideLessonProps) {
  const isQuiz = lesson.type === 'QUIZ';

  // 기본 아이콘
  let Icon = isQuiz ? PencilLine : PlayCircle;
  let iconClassName = 'text-zinc-600'; // 기본 회색

  // 색상 규칙
  const activeColor = isQuiz ? 'text-emerald-400' : 'text-indigo-400';
  const completedColor = activeColor; // VIDEO=보라, QUIZ=민트

  // Completed 레슨
  if (isCompleted) {
    Icon = CheckCircle;
    iconClassName = completedColor;
  }

  // Active 레슨 (Completed보다 우선)
  if (isActive) {
    Icon = isQuiz ? PencilLine : PlayCircle;
    iconClassName = activeColor;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left',
        'focus:outline-none ',
        isActive
          ? isQuiz
            ? 'bg-emerald-500/10 text-emerald-400' // QUIZ Active: 민트
            : 'bg-indigo-500/10 text-indigo-400' // VIDEO Active: 보라
          : 'hover:bg-zinc-800/50 text-zinc-300',
      )}
    >
      <Icon className={cn('w-4 h-4 shrink-0', iconClassName)} />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{lesson.title}</p>
        {lesson.duration && (
          <p className="text-xs opacity-70 mt-0.5">{lesson.duration}</p>
        )}
      </div>

      {isActive && (
        <div
          className={cn(
            'w-1.5 h-1.5 rounded-full shrink-0',
            isQuiz ? 'bg-emerald-400' : 'bg-indigo-500',
          )}
        />
      )}
    </button>
  );
}
