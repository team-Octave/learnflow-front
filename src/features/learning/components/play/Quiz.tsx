// src/features/learning/components/play/Quiz.tsx
'use client';

import { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'; // ✅ 추가
import { PencilLine } from 'lucide-react';
import { ButtonSubmit } from './ButtonSubmit';
import { Question } from './Question';
import type { Lesson } from '@/features/lectures/types';

type QuizProps = {
  lesson: Lesson;
  onCompleteLesson?: (lessonId: string) => void;
};

export function Quiz({ lesson, onCompleteLesson }: QuizProps) {
  const [selected, setSelected] = useState<Record<string, 'O' | 'X'>>({});
  const [submitted, setSubmitted] = useState(false);

  const questions = lesson.questions ?? [];

  // ✅ 현재 URL 정보 사용
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSelect = (questionId: string, answer: 'O' | 'X') => {
    if (submitted) return;
    setSelected((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    if (submitted) return;

    // 🔥 모든 문제 선택 여부 확인
    const totalQuestions = questions.length;
    const selectedCount = Object.keys(selected).length;

    if (selectedCount !== totalQuestions) {
      alert('모든 문항에 대해 O 또는 X를 선택해 주세요.');
      return;
    }

    setSubmitted(true);
    onCompleteLesson?.(lesson.id);

    const params = new URLSearchParams(searchParams.toString());
    params.set('completedLessonId', lesson.id);

    router.replace(
      params.toString() ? `${pathname}?${params.toString()}` : pathname,
    );
  };

  if (!questions.length) {
    return (
      <div className="w-full h-full flex items-center justify-center p-4">
        <p className="text-zinc-400 text-sm">아직 등록된 퀴즈가 없어요.</p>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center p-4 md:p-8 lg:p-12">
      <div className="w-full max-w-3xl bg-zinc-900 rounded-xl border border-zinc-800 p-8 shadow-2xl space-y-6 overflow-y-auto scrollbar-hide h-[600px] ">
        {/* 상단 타이틀 영역 */}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-300">
            <PencilLine className="w-5 h-5" />
          </div>

          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-zinc-50">
              퀴즈
            </h1>
            <p className="text-sm text-zinc-400">
              다음 문장이 맞으면 O, 틀리면 X를 선택하세요.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {questions.map((q, index) => (
            <Question
              key={q.id}
              index={index}
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

          {/* 사용자가 퀴즈 제출에 성공하면 URL이 /play/lecture-1/lesson-2?completedLessonId=lesson-2이런 식으로 바뀜. */}
          <ButtonSubmit
            onClick={handleSubmit}
            disabled={submitted || questions.length === 0}
          >
            {submitted ? '제출 완료' : '제출하기'}
          </ButtonSubmit>
        </div>
      </div>
    </div>
  );
}
