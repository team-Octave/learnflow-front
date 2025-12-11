// Quiz.tsx
'use client';

import { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { ButtonSubmit } from './ButtonSubmit';
import { Question } from './Question';

// ===== 타입 정의 =====
type Answer = 'O' | 'X';

interface QuizQuestion {
  id: string; // id가 숫자라면 number로 바꿔도 됨
  question: string;
  answer: Answer;
}

interface Lesson {
  questions: QuizQuestion[];
}

interface QuizProps {
  lesson: Lesson;
}

// =====================

export function Quiz({ lesson }: QuizProps) {
  // { questionId: "O" | "X" }
  const [selected, setSelected] = useState<Record<string, Answer>>({});

  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (questionId: string, answer: Answer) => {
    if (submitted) return;
    setSelected((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    if (submitted) return;
    setSubmitted(true);
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4 md:p-8 lg:p-12 overflow-y-auto custom-scrollbar">
      <div className="w-full max-w-3xl bg-zinc-900 rounded-xl border border-zinc-800 p-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">퀴즈</h2>
            <p className="text-zinc-400">
              다음 문장이 맞으면 O, 틀리면 X를 선택하세요.
            </p>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-8">
          {lesson.questions?.map((q, index) => (
            <Question
              key={q.id}
              index={index}
              question={q}
              selected={selected[q.id]}
              submitted={submitted}
              correctAnswer={q.answer}
              onSelect={handleSelect}
            />
          ))}

          {/* Submit Button */}
          <div className="flex justify-end pt-4 border-t border-zinc-800">
            <ButtonSubmit onClick={handleSubmit} disabled={submitted} />
          </div>
        </div>
      </div>
    </div>
  );
}
