'use client';

import React from 'react';

type OX = 'O' | 'X';

export interface QuizQuestion {
  id: string;
  question: string;
  // 정답이 없는 경우도 있을 수 있으니 optional로 둠
  answer?: OX;
}

interface QuestionProps {
  index: number;
  question: QuizQuestion;
  selected?: OX;
  submitted: boolean;
  correctAnswer?: OX;
  onSelect: (questionId: string, answer: OX) => void;
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
        {(['O', 'X'] as OX[]).map((option) => {
          const isActive = selected === option;

          return (
            <label
              key={option}
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
                {option}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
