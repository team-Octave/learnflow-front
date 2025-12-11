// src/features/learning/components/play/Quiz.tsx
'use client';

import { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { ButtonSubmit } from './ButtonSubmit';
import { Question } from './Question';
import type { Lesson } from '@/features/lectures/types'; // ✅ 서비스 쪽 Lesson 타입 사용

type QuizProps = {
  lesson: Lesson; // ✅ 여기서도 그대로 사용
};

export function Quiz({ lesson }: QuizProps) {
  // lesson.questions = [{ id, question, answer }] 형태라고 가정
  // answer: "O" | "X"

  const [selected, setSelected] = useState<Record<string, 'O' | 'X'>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (questionId: string, answer: 'O' | 'X') => {
    if (submitted) return;
    setSelected((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    if (submitted) return;
    setSubmitted(true);
  };

  const questions = lesson.questions ?? []; // ✅ questions가 optional이라 안전하게 처리

  if (!questions.length) {
    return (
      <div className="w-full h-full flex items-center justify-center p-4">
        <p className="text-zinc-400 text-sm">아직 등록된 퀴즈가 없어요.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-4 md:p-8 lg:p-12 overflow-y-auto custom-scrollbar">
      <div className="w-full max-w-3xl bg-zinc-900 rounded-xl border border-zinc-800 p-8 shadow-2xl space-y-6">
        <header className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-emerald-400 uppercase tracking-wide mb-1">
              퀴즈
            </p>
            <h1 className="text-xl md:text-2xl font-semibold text-zinc-50">
              {lesson.title}
            </h1>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-800/80 border border-zinc-700">
            <HelpCircle className="w-4 h-4 text-zinc-400" />
            <span className="text-xs text-zinc-300">
              O / X를 선택하고 제출해 보세요
            </span>
          </div>
        </header>

        <div className="space-y-4">
          {questions.map((q, index) => (
            <Question
              key={q.id}
              index={index + 1} //  index 추가 (1번 문제, 2번 문제... 용도)
              question={q}
              selected={selected[q.id]}
              onSelect={handleSelect}
              submitted={submitted}
            />
          ))}
        </div>

        <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
          <p className="text-xs text-zinc-400">
            총{' '}
            <span className="font-semibold text-zinc-200">
              {questions.length}
            </span>
            문제
          </p>
          <ButtonSubmit
            onClick={handleSubmit}
            disabled={submitted || questions.length === 0}
          >
            {submitted ? '제출 완료' : '정답 제출'}
          </ButtonSubmit>
        </div>
      </div>
    </div>
  );
}
