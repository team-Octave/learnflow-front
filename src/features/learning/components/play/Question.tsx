// src/features/learning/components/play/Question.tsx
'use client';

import { QuizQuestion } from '@/features/lectures/types';
// import { cn } from '@/lib/utils';
import { cn } from '@/shared/utils';

interface QuestionProps {
  index: number;
  question: QuizQuestion;
  selected?: boolean; // undefined = 미선택 (false도 선택으로 인정)
  submitted: boolean;
  correctAnswer: boolean; // Quiz에서 내려줌(필수)
  onSelect: (questionId: string, answer: boolean) => void;
}

export function Question({
  index,
  question,
  selected,
  submitted,
  correctAnswer,
  onSelect,
}: QuestionProps) {
  const hasSelected = selected !== undefined;

  return (
    <div className="p-6 rounded-lg transition-colors mb-0">
      <div className="flex gap-4 mb-4">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold shrink-0">
          Q{index + 1}
        </span>
        <p className="font-medium text-lg leading-relaxed pt-0.5">
          {question.question}
        </p>
      </div>

      <div
        className="flex gap-4 pl-12"
        role="radiogroup"
        aria-label={`quiz-${question.id}`}
      >
        {([true, false] as const).map((option) => {
          const isActive = hasSelected && selected === option;

          // ✅ 제출 후 채점 상태
          const isCorrectOption = submitted && option === correctAnswer; // 정답 옵션(항상 초록)
          const isWrongSelected =
            submitted && isActive && option !== correctAnswer; // 내가 고른 오답(빨강)

          const labelClass = cn(
            'flex-1 flex items-center justify-center gap-2 p-4 rounded-md border transition-all group',
            // 제출 전 UI + hover
            !submitted && 'cursor-pointer',
            !submitted &&
              (isActive
                ? 'border-emerald-500 bg-emerald-500/20'
                : 'border-zinc-700'),
            !submitted && 'hover:bg-zinc-700/50 hover:border-emerald-500/50',

            // 제출 후 채점 UI
            submitted &&
              (isCorrectOption
                ? 'border-green-500 bg-green-500/20 cursor-default'
                : isWrongSelected
                ? 'border-red-500 bg-red-500/20 cursor-default'
                : 'opacity-80 cursor-default'),
          );

          const inputClass = cn(
            'w-4 h-4',
            submitted
              ? isWrongSelected
                ? 'accent-red-500'
                : isCorrectOption
                ? 'accent-green-500'
                : 'accent-zinc-500'
              : 'accent-emerald-500',
          );

          return (
            <label key={String(option)} className={labelClass}>
              <input
                type="radio"
                name={`quiz-${question.id}`}
                value={String(option)}
                checked={isActive}
                disabled={submitted}
                onChange={() => onSelect(question.id, option)} // Quiz.tsx의 handleSelect가 submitted도 방어하지만,
                className={inputClass} // 여기서 disabled로 한번 더 확실히 막음
              />
              <span className="text-xl font-bold text-zinc-300 group-hover:text-white">
                {option ? 'O' : 'X'}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
