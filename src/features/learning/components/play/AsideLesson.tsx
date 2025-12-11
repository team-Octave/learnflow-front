// features/learning/components/play/AsideCurriculum/AsideLesson.tsx

import { cn } from '@/lib/utils';
import { PlayCircle, HelpCircle, Lock, CheckCircle } from 'lucide-react';

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

  let Icon = Lock;
  let iconClassName = 'text-zinc-600';

  if (isQuiz) {
    Icon = HelpCircle;
  }

  if (isCompleted) {
    Icon = CheckCircle;
    iconClassName = 'text-emerald-400';
  }

  if (isActive) {
    Icon = isQuiz ? HelpCircle : PlayCircle;
    iconClassName = 'text-indigo-400';
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left',
        'focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:ring-offset-0',
        isActive
          ? 'bg-indigo-500/10 text-indigo-400'
          : 'hover:bg-zinc-800/50 text-zinc-300',
      )}
    >
      <Icon className={cn('w-4 h-4 shrink-0', !isActive && iconClassName)} />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{lesson.title}</p>
        {lesson.duration && (
          <p className="text-xs opacity-70 mt-0.5">{lesson.duration}</p>
        )}
      </div>

      {isActive && (
        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
      )}
    </button>
  );
}
