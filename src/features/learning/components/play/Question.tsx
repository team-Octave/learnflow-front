// src\features\learning\components\play\Question.tsx
'use client';

import { QuizQuestion } from '@/features/lectures/types';

interface QuestionProps {
  index: number;
  question: QuizQuestion;
  selected?: boolean;
  submitted: boolean;
  correctAnswer?: boolean;
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
  const isCorrect = submitted && selected === correctAnswer;
  const isWrong = submitted && selected && selected !== correctAnswer;

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
          const isActive = selected === option;

          return (
            <label
              key={idx}
              onClick={() => onSelect(question.id, option)}
              className={`
                flex-1 flex items-center justify-center gap-2 p-4 rounded-md border
                cursor-pointer transition-all group
                ${
                  isActive
                    ? 'border-emerald-500 bg-emerald-500/20' /*  선택된 옵션 민트 */
                    : 'border-zinc-700'
                }
                ${
                  !submitted
                    ? 'hover:bg-zinc-700/50 hover:border-emerald-500/50' /*  hover도 민트 */
                    : ''
                }
                ${
                  submitted && isActive && isWrong
                    ? // ? 'border-red-500 bg-red-500/20'
                      'border-green-500 bg-green-500/20' //정답 오답체크 기능 뺐으므로
                    : ''
                }
                ${
                  submitted && isActive && isCorrect
                    ? 'border-green-500 bg-green-500/20'
                    : ''
                }
              `}
            >
              <input
                type="radio"
                name={`quiz-${question.id}`}
                checked={isActive}
                readOnly
                className="w-4 h-4 accent-emerald-500" /*  동그라미 체크 색도 민트 */
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
