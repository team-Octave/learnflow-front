// src/features/lectures/components/detail/Lesson.tsx
// 강의 상세 페이지에서 ‘레슨 하나’(영상/퀴즈)를 나타내는 버튼 UI

'use client';

import { PlayCircle, FileQuestion } from 'lucide-react';
import type { Lesson as LessonType } from '../../types';

interface LessonProps {
  lesson: LessonType;
  isActive?: boolean; // 현재 선택된 레슨인지 여부
  onClick?: () => void; // 클릭 시 실행할 함수
  disabled?: boolean; // 클릭 불가 여부(예: QUIZ)
}

export default function Lesson({
  lesson,
  isActive = false,
  onClick,
  disabled = false,
}: LessonProps) {
  const isVideo = lesson.lessonTypeDisplayName === 'VIDEO';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full
        flex items-center justify-between
        p-3 rounded-md
        transition-colors
        group
        text-left
        border

        ${
          // disabled면 hover/커서 막고 흐리게
          disabled
            ? 'opacity-50 cursor-not-allowed border-zinc-800 bg-zinc-900/10'
            : 'cursor-pointer border-transparent'
        }

        ${
          // 선택된 레슨 배경/테두리 강조
          !disabled && isActive ? 'bg-indigo-500/10 border-indigo-500/20' : ''
        }

        ${
          // 선택 안 된 레슨 hover 시만 배경 바뀜 (disabled 제외)
          !disabled && !isActive ? 'hover:bg-zinc-800/50' : ''
        }
      `}
    >
      {/* Left: Icon + Lesson title */}
      <div className="flex items-center gap-3">
        {isVideo ? (
          <PlayCircle
            className={`w-4 h-4 transition-colors ${
              disabled
                ? 'text-zinc-600'
                : isActive
                  ? 'text-indigo-400'
                  : 'text-zinc-500 group-hover:text-indigo-400'
            }`}
          />
        ) : (
          <FileQuestion
            className={`w-4 h-4 transition-colors ${
              disabled
                ? 'text-zinc-600'
                : isActive
                  ? 'text-indigo-400'
                  : 'text-zinc-500 group-hover:text-indigo-400'
            }`}
          />
        )}

        <span
          className={`text-sm transition-colors ${
            disabled
              ? 'text-zinc-500'
              : isActive
                ? 'text-white font-medium'
                : 'text-zinc-300 group-hover:text-white'
          }`}
        >
          {lesson.lessonTitle}
        </span>
      </div>

      {/* (선택) 오른쪽에 타입 표시 같은 거 넣고 싶으면 여기 */}
      {/* <span className="text-xs text-zinc-500">{lesson.lessonTypeDisplayName}</span> */}
    </button>
  );
}
