// src/features/learning/components/play/AsideCurriculum.tsx
'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import type { Lecture } from '@/features/lectures/types';
import { AsideLesson } from './AsideLesson';

interface AsideCurriculumProps {
  lecture: Lecture;
  currentLessonId: string;
  progressRate?: number;
  onSelectLesson?: (lessonId: string) => void;
}

export function AsideCurriculum({
  lecture,
  currentLessonId,
  progressRate,
  onSelectLesson,
}: AsideCurriculumProps) {
  const router = useRouter();
  const searchParams = useSearchParams(); // ✅ 현재 URL 쿼리 읽기

  // ✅ 퀴즈/비디오에서 셋한 값 (완료된 레슨 ID)
  const completedLessonId = searchParams.get('completedLessonId');
  const autoNext = searchParams.get('autoNext'); // '1' 이면 다음 레슨 자동 이동

  const allLessons = lecture.curriculum.flatMap((section) => section.lessons);

  const currentIndex = allLessons.findIndex(
    (lesson) => lesson.id === currentLessonId,
  );

  const totalLessons = allLessons.length;

  // ✅ 완료된 레슨 개수(지금은 쿼리에 하나만 저장하므로 0 또는 1)
  const completedCount = completedLessonId ? 1 : 0;

  const computedProgress =
    totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100);

  const progressValue =
    typeof progressRate === 'number' ? progressRate : computedProgress;

  // ✅ 수강 완료 후 자동으로 다음 레슨으로 이동
  useEffect(() => {
    if (autoNext !== '1') return;
    if (!completedLessonId) return;
    if (completedLessonId !== currentLessonId) return;
    if (currentIndex === -1) return;

    const nextLesson = allLessons[currentIndex + 1];
    if (!nextLesson) return; // 다음 레슨이 없으면 아무 것도 안 함

    const params = new URLSearchParams(searchParams.toString());
    // 다음 레슨으로 넘어갈 때는 autoNext 플래그 제거 (무한 루프 방지)
    params.delete('autoNext');

    const queryString = params.toString();
    const suffix = queryString ? `?${queryString}` : '';

    router.push(`/play/${lecture.id}/${nextLesson.id}${suffix}`);
  }, [
    autoNext,
    completedLessonId,
    currentLessonId,
    currentIndex,
    allLessons,
    lecture.id,
    router,
    searchParams,
  ]);

  return (
    <aside className="flex flex-col w-96 border-l border-zinc-800 bg-zinc-900/50">
      <div className="p-4 border-b border-zinc-800">
        <h2 className="font-bold text-lg mb-1">커리큘럼</h2>
        <div className="progress">
          <div className="text flex justify-between text-xs text-zinc-400 mb-1">
            <p>진도율</p>
            <span>{progressValue}% 완료</span>
          </div>
          <Progress value={progressValue} className="h-2" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <Accordion
          type="multiple"
          defaultValue={lecture.curriculum.map((s) => String(s.id))}
          className="space-y-4"
        >
          {lecture.curriculum.map((section) => (
            <AccordionItem
              key={section.id}
              value={String(section.id)}
              className="border-none"
            >
              <AccordionTrigger className="hover:no-underline py-2 text-sm text-zinc-400 hover:text-zinc-200">
                {section.title}
              </AccordionTrigger>

              <AccordionContent className="pb-0">
                <div className="space-y-1 pt-1">
                  {section.lessons.map((lesson) => {
                    const isActive = lesson.id === currentLessonId;

                    // ❌ 기존: 순서 기준 자동 완료
                    // const lessonIndex = allLessons.findIndex((l) => l.id === lesson.id);
                    // const isCompletedByOrder =
                    //   lessonIndex !== -1 && lessonIndex < currentIndex;

                    // ✅ URL 쿼리에 찍힌 레슨만 완료 상태
                    const isCompletedFromParam =
                      completedLessonId === lesson.id;

                    const isCompleted = isCompletedFromParam;

                    return (
                      <AsideLesson
                        key={lesson.id}
                        lesson={lesson}
                        isActive={isActive}
                        isCompleted={isCompleted}
                        onClick={() => {
                          onSelectLesson?.(lesson.id);
                          // ⚠ 여기서는 기존 동작 그대로 유지 (쿼리 없이 이동)
                          router.push(`/play/${lecture.id}/${lesson.id}`);
                        }}
                      />
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </aside>
  );
}
