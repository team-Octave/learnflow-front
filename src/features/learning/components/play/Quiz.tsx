'use client';

import { useState, useTransition } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { PencilLine } from 'lucide-react';

import { ButtonSubmit } from './ButtonSubmit';
import { Question } from './Question';
import { completeLessonAction } from '../../actions';

import type { Lesson } from '@/features/lectures/types';

interface QuizProps {
  enrollmentId: number;
  lectureId: number;
  lesson: Lesson;
  isCompleted: boolean;
}

// Quiz라는 React 함수 컴포넌트를 정의
/*
“Quiz라는 컴포넌트를 만들 건데,
이 컴포넌트는 enrollmentId, lectureId, lesson, isCompleted
네 개의 값을 props로 받아서 사용한다
*/
export function Quiz({
  enrollmentId,
  lectureId,
  lesson,
  isCompleted,
}: QuizProps) {
  //QuizProps 이 컴포넌트가 받는 props의 타입 정의
  // 문제ID → 사용자가 고른 true/false를 저장하는 상태 객체를 만든다
  const [selected, setSelected] = useState<Record<string, boolean>>({}); // Record< 키 string, 값 boolean> 객체 타입을 정의하는 방법

  /*
    selected = {
      "101": false,
      "102": true,
    }

    Record<string, boolean>
    {
      "1": true,
      "2": false,
      "abc": true
    }

    ({})→ 처음엔 아무 문제도 안 골랐으니까
    빈 객체로 시작

    selected = {}  문제를 클릭할 때마다 하나씩 채워짐.

    setSelected((prev) => ({
  ...prev,
  [questionId]: answer,  // true or false
}));
  */

  // 서버 액션 실행 중 상태 관리
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 4️⃣ 퀴즈 데이터 정리
  // lesson.quizQuestions : lesson 객체 안에 있는 퀴즈 질문 목록
  // ?? : 왼쪽 값이 null 또는 undefined일 때만 오른쪽 값을 사용, 퀴즈가 없을 때 사용할 빈 배열
  //lesson.quizQuestions가 있으면 그대로 쓰고, 없으면 빈 배열을 써라
  const questions = lesson.quizQuestions ?? [];

  const handleSelect = (questionId: number, answer: boolean) => {
    if (isCompleted) return;
    setSelected((prev) => ({ ...prev, [String(questionId)]: answer }));
  };

  // 퀴즈 제출 버튼 클릭 시 실행되는 이벤트 핸들러
  const handleSubmit = () => {
    if (isCompleted) return;

    const unanswered = questions.filter(
      (q) => selected[String(q.id)] === undefined,
    );

    if (unanswered.length > 0) {
      alert('모든 문항에 대해 O 또는 X를 선택해 주세요.');
      return;
    }

    startTransition(async () => {
      // ✅ lectureId 추가
      const state = await completeLessonAction(
        enrollmentId,
        lectureId,
        lesson.id,
      );

      if (state.success) {
        const params = new URLSearchParams(searchParams.toString());
        params.set('lessonId', String(lesson.id));
        router.replace(`${pathname}?${params.toString()}`);
        router.refresh();
      } else {
        alert(state.message || '레슨 완료 처리에 실패하였습니다.');
      }
    });
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
      <div className="w-full max-w-3xl bg-zinc-900 rounded-xl border border-zinc-800 p-8 shadow-2xl space-y-6 overflow-y-auto h-[600px]">
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
              onSelect={handleSelect}
              selected={selected[String(q.id)]}
              submitted={isCompleted}
              correctAnswer={q.correct}
            />
          ))}
        </div>

        <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
          <p className="text-xs text-zinc-400">
            총{' '}
            <span className="font-semibold text-zinc-200">
              {questions.length}
            </span>{' '}
            문제
          </p>

          <ButtonSubmit
            onClick={handleSubmit}
            disabled={isCompleted || isPending}
          >
            {isCompleted ? '제출 완료' : '제출하기'}
          </ButtonSubmit>
        </div>
      </div>
    </div>
  );
}
