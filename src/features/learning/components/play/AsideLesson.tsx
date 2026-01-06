// src/features/learning/components/play/AsideLesson.tsx

import { Lesson } from '@/features/lectures/types';
import { cn } from '@/shared/utils';
import { PlayCircle, PencilLine, CheckCircle } from 'lucide-react';

type LessonType = 'VIDEO' | 'QUIZ';

interface AsideLessonProps {
  lesson: Lesson;
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
  const isQuiz = lesson.lessonTypeDisplayName === 'QUIZ';

  const activeColor = isQuiz ? 'text-emerald-400' : 'text-indigo-400';
  const baseIcon = isQuiz ? PencilLine : PlayCircle;

  // ✅ 아이콘은 "완료"가 최우선
  const Icon = isCompleted ? CheckCircle : baseIcon;

  // ✅ 아이콘 색상: active 또는 completed면 색 적용, 아니면 회색
  const iconClassName = isActive || isCompleted ? activeColor : 'text-zinc-600';

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 pr-3 pl-3 h-15 rounded-lg transition-colors text-left',
        'focus:outline-none cursor-pointer',
        // ✅ Active일 때 배경/텍스트 강조
        isActive
          ? isQuiz
            ? 'bg-emerald-500/10 text-emerald-400'
            : 'bg-indigo-500/10 text-indigo-400'
          : 'hover:bg-zinc-800/50 text-zinc-300',
        // ✅ 완료됐지만 현재 활성 레슨이 아닐 때도 색만 살짝
        !isActive &&
          isCompleted &&
          (isQuiz ? 'text-emerald-400' : 'text-indigo-400'),
      )}
    >
      <Icon className={cn('w-4 h-4 shrink-0', iconClassName)} />

      <div className="flex-1 min-w-0 ">
        <p className="text-sm font-medium truncate">{lesson.lessonTitle}</p>
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
