// src/features/lectures/components/detail/Lesson.tsx;
// 강의 상세 페이지에서 ‘레슨 하나’(영상/퀴즈)를 나타내는 버튼 UI

'use client';

import { PlayCircle, FileQuestion } from 'lucide-react';
import type { Lesson as LessonType } from '../../types';

interface LessonProps {
  lesson: LessonType;
  isActive?: boolean; //현재 선택된 레슨인지 여부
  onClick?: () => void;
}

//  @잘 이해안감 props 객체에서
// lesson, isActive, onClick을 바로 꺼내 쓰고
// isActive는 기본값 false로 설정하겠다
export default function Lesson({
  lesson,
  isActive = false,
  onClick,
}: LessonProps) {
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
          // 선택된 레슨배경 강조테두리 있음
          // 선택 안 된 레슨 hover 시만 배경 바뀜
          isActive
            ? 'bg-indigo-500/10 border border-indigo-500/20'
            : 'hover:bg-zinc-800/50'
        }
      `}
    >
      {/* Left: Icon + Lesson title */}
      <div className="flex items-center gap-3">
        {/* lesson.lessonTypeDisplayName 값에 따라 분기
          'VIDEO' → ▶PlayCircle
          그 외 →  FileQuestion (퀴즈) */}
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
            // 선택됨 → 진한 흰색 + 살짝 두껍게
            // 선택 안됨 → 회색 → hover 시 흰색
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
