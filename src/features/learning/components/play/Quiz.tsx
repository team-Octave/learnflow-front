// src/features/learning/components/play/Quiz.tsx
'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { PencilLine } from 'lucide-react';
import { ButtonSubmit } from './ButtonSubmit';
import { Question } from './Question';
import type { Lesson } from '@/features/lectures/types';
import type { Enrollment } from '@/features/learning/types';
import { completeLessonAction } from '../../actions';

declare global {
  interface Window {
    __QUIZ_CACHE__?: Record<string, Record<string, boolean>>; // key -> (questionId -> answer)
    __QUIZ_REFRESH_KEY__?: string; // refresh로 인한 언마운트 구분용
  }
}

type QuizProps = {
  enrollmentId: number;
  lesson: Lesson;
  enrollmentInfo: Enrollment; // 수강 정보(완료한 레슨 목록 completedLessonIds 포함)
};

export function Quiz({ enrollmentId, lesson, enrollmentInfo }: QuizProps) {
  const [isPending, startTransition] = useTransition();

  // 제출 전: 사용자가 각 문항에 대해 선택한 답을 저장
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  // 제출 직후 채점 UI 유지용(내가 제출한 답 스냅샷)
  // - router.refresh()로 컴포넌트가 리마운트돼도 window 캐시에서 1회 복원
  // - 나갔다 들어오면 캐시가 없어서 정답만 표시(초록)
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<
    string,
    boolean
  > | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const questions = lesson.quizQuestions ?? [];

  // 서버 기준 완료 여부
  const isCompleted = useMemo(() => {
    return (
      enrollmentInfo.completedLessonIds?.some(
        (id) => id === Number(lesson.id),
      ) ?? false
    );
  }, [enrollmentInfo.completedLessonIds, lesson.id]);

  // “이 화면에서 지금 제출 완료 상태로 보여줄까?”
  const [submitted, setSubmitted] = useState<boolean>(isCompleted);

  //  캐시 키 (수강 + 레슨 단위)
  const cacheKey = `${enrollmentId}:${lesson.id}`;

  //  레슨 변경 시에만 초기화 (refresh로 isCompleted 변해도 selected를 날리지 않음)
  useEffect(() => {
    setSelected({});
    setSubmittedAnswers(null);
    setSubmitted(isCompleted);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson.id]);

  //  refresh 후 리마운트 되었을 때: 전역 캐시에서 1회 복원
  useEffect(() => {
    const cache = window.__QUIZ_CACHE__?.[cacheKey];

    if (cache) {
      // 제출 직후(정답/오답 UI 유지)
      setSubmitted(true);
      setSubmittedAnswers(cache);

      //  1회 복원 후 즉시 삭제 → 나갔다가 들어오면 답안 없음(정답만 초록)
      if (window.__QUIZ_CACHE__) delete window.__QUIZ_CACHE__[cacheKey];
    } else {
      // 캐시가 없다면 서버 기준 완료 여부에 따름(재진입 케이스)
      if (isCompleted) setSubmitted(true);
      else setSubmitted(false);
    }

    // cleanup: 언마운트 시 캐시 정리
    return () => {
      //  refresh로 인한 언마운트면 지우면 안 됨
      if (window.__QUIZ_REFRESH_KEY__ === cacheKey) return;

      //  페이지 이동 등 실제 언마운트면 캐시 제거
      if (window.__QUIZ_CACHE__) delete window.__QUIZ_CACHE__[cacheKey];
    };
  }, [cacheKey, isCompleted]);

  const handleSelect = (questionId: string, answer: boolean) => {
    if (submitted) return;
    setSelected((prev) => ({ ...prev, [String(questionId)]: answer }));
  };

  const handleSubmit = () => {
    if (submitted) return;

    // (1) 미선택 문항 검사
    const unanswered = questions.filter(
      (q) => selected[String(q.id)] === undefined,
    );

    if (unanswered.length > 0) {
      alert('모든 문항에 대해 O 또는 X를 선택해 주세요.');
      return;
    }

    // (2) 서버 액션 호출로 레슨 완료 처리
    startTransition(async () => {
      const state = await completeLessonAction(
        enrollmentId,
        parseInt(lesson.id),
      );

      if (state.success) {
        //  제출 직후: refresh로 리마운트돼도 오답/정답 채점 UI 유지하기 위해 window에 1회 저장
        window.__QUIZ_CACHE__ = window.__QUIZ_CACHE__ ?? {};
        window.__QUIZ_CACHE__[cacheKey] = { ...selected };
        window.__QUIZ_REFRESH_KEY__ = cacheKey;

        // 현재 렌더에서도 즉시 채점 UI 유지
        setSubmittedAnswers({ ...selected });
        setSubmitted(true);

        const params = new URLSearchParams(searchParams.toString());
        params.set('lessonId', lesson.id);
        router.replace(`${pathname}?${params.toString()}`);

        // 서버컴포넌트(enrollmentInfo) 갱신해서 사이드바 진행률도 즉시 반영
        router.refresh();

        // refresh 플래그 해제(다음 언마운트는 실제 이동으로 처리되도록)
        queueMicrotask(() => {
          if (window.__QUIZ_REFRESH_KEY__ === cacheKey) {
            window.__QUIZ_REFRESH_KEY__ = undefined;
          }
        });
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

  //  렌더링에서 사용할 선택값:
  // - 제출 직후: submittedAnswers(스냅샷) 우선
  // - 제출 전: selected 사용
  const renderedSelected = (qid: string) =>
    (submittedAnswers ?? selected)[String(qid)];

  return (
    <div className="w-full flex items-center justify-center p-4 md:p-8 lg:p-12">
      <div className="w-full max-w-3xl bg-zinc-900 rounded-xl border border-zinc-800 p-8 shadow-2xl space-y-6 overflow-y-auto scrollbar-hide h-[600px]">
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
              selected={renderedSelected(q.id)}
              onSelect={handleSelect}
              submitted={submitted}
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
            disabled={submitted || isPending}
          >
            {submitted ? '제출 완료' : '제출하기'}
          </ButtonSubmit>
        </div>
      </div>
    </div>
  );
}
