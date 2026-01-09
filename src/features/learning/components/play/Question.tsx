// src/features/learning/components/play/Question.tsx
'use client';

import { QuizQuestion } from '@/features/lectures/types';

interface QuestionProps {
  index: number;
  question: QuizQuestion;
  selected?: boolean;
  submitted: boolean;
  correctAnswer: boolean; // optional 말고 필수로 (Quiz에서 넘김)
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
  const hasSelected = selected !== undefined; // false도 선택으로 인정

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

      <div className="flex gap-4 pl-12">
        {([true, false] as boolean[]).map((option, idx) => {
          const isActive = hasSelected && selected === option;

          // 제출 후 채점 색상 규칙
          const isCorrectOption = submitted && option === correctAnswer; // 정답 보기(항상 초록)
          const isWrongSelected =
            submitted && isActive && option !== correctAnswer; // 내가 고른 오답(빨강)

          const base =
            'flex-1 flex items-center justify-center gap-2 p-4 rounded-md border cursor-pointer transition-all group';

          const normalState = isActive
            ? 'border-emerald-500 bg-emerald-500/20'
            : 'border-zinc-700';

          const hoverState = !submitted
            ? 'hover:bg-zinc-700/50 hover:border-emerald-500/50'
            : '';

          const gradingState = submitted
            ? isCorrectOption
              ? 'border-green-500 bg-green-500/20'
              : isWrongSelected
              ? 'border-red-500 bg-red-500/20'
              : 'opacity-80'
            : '';

          return (
            <label
              key={idx}
              onClick={() => onSelect(question.id, option)}
              className={`${base} ${normalState} ${hoverState} ${gradingState}`}
            >
              <input
                type="radio"
                name={`quiz-${question.id}`}
                checked={!!isActive}
                readOnly
                className={`w-4 h-4 ${
                  submitted
                    ? isWrongSelected
                      ? 'accent-red-500'
                      : isCorrectOption
                      ? 'accent-green-500'
                      : 'accent-zinc-500'
                    : 'accent-emerald-500'
                }`}
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
