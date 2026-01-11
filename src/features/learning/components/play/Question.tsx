// src/features/learning/components/play/Question.tsx
'use client';

import { QuizQuestion } from '@/features/lectures/types';
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
          // 현재 option이 내가 고른 값이면 true
          const isActive = hasSelected && selected === option;

          //  제출 후 채점 상태
          const isCorrectOption = submitted && option === correctAnswer; // 정답 옵션 : 제출 후 정답과 일치→ 항상 초록색
          const isWrongSelected =
            submitted && isActive && option !== correctAnswer; // 내가 고른 오답 : 제출 후 내가 선택했고 정답이 아님→ 빨간색

          const labelClass = cn(
            'flex-1 flex items-center justify-center gap-2 p-4 rounded-md border transition-all group',
            // 제출 전(!submitted) UI + hover
            !submitted && 'cursor-pointer', //제출 전
            //  isActive 라디오버튼 active됐나 안됐나 (선택 여부  )
            !submitted &&
              (isActive
                ? 'border-emerald-500 bg-emerald-500/20'
                : 'border-zinc-700'), // 선택 여부에 따른 기본 스타일? 선택됨 :  미선택
            !submitted && 'hover:bg-zinc-700/50 hover:border-emerald-500/50', //hover

            // 제출 후 채점 UI
            // 제출 후: 정답은 초록, 선택한 오답은 빨강, 나머지는 흐리게 표시 (모두 클릭 불가)
            submitted &&
              (isCorrectOption
                ? 'border-green-500 bg-green-500/20 cursor-default'
                : isWrongSelected
                ? 'border-red-500 bg-red-500/20 cursor-default'
                : 'opacity-80 cursor-default'),
          );

          // 라디오 버튼 색상 ui
          const inputClass = cn(
            'w-4 h-4',
            // submitted ? (제출 후 true) : (제출 전 false)
            submitted
              ? isWrongSelected // 오답 → 빨강
                ? 'accent-red-500'
                : isCorrectOption // 정답 → 초록
                ? 'accent-green-500'
                : //나머지 → 회색
                  'accent-zinc-500'
              : 'accent-emerald-500', //제출 전 false
          );

          return (
            <label key={String(option)} className={labelClass}>
              <input
                type="radio"
                name={`quiz-${question.id}`}
                value={String(option)}
                checked={isActive}
                disabled={submitted}
                // 값이 변경되면(onChange), 해당 질문의 id와 선택한 옵션을 onSelect 함수에 전달한다.
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
