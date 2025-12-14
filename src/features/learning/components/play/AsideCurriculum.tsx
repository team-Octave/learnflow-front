// src/features/learning/components/play/AsideCurriculum.tsx
'use client';

import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import type { Lecture } from '@/features/lectures/types';
import { AsideLesson } from './AsideLesson';
import { Enrollment } from '../../types';

interface AsideCurriculumProps {
  lecture: Lecture;
  currentLessonId: string;
  enrollmentInfo: Enrollment;
}

export function AsideCurriculum({
  lecture,
  currentLessonId,
  enrollmentInfo,
}: AsideCurriculumProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleClickLesson = (lessonId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('lessonId', lessonId);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <aside className="flex flex-col w-96 border-l border-zinc-800 bg-zinc-900/50">
      <div className="p-4 border-b border-zinc-800">
        <h2 className="font-bold text-lg mb-1">커리큘럼</h2>
        <div className="progress">
          <div className="text flex justify-between text-xs text-zinc-400 mb-1">
            <p>진도율</p>
            <span>{enrollmentInfo.progress || 0}% 완료</span>
          </div>
          <Progress value={enrollmentInfo.progress || 0} className="h-2" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <Accordion
          type="multiple"
          defaultValue={lecture.chapters!.map((s) => String(s.id))}
          className="space-y-4"
        >
          {lecture.chapters!.map((chapter) => (
            <AccordionItem
              key={chapter.id}
              value={String(chapter.id)}
              className="border-none"
            >
              <AccordionTrigger className="hover:no-underline py-2 text-sm text-zinc-400 hover:text-zinc-200">
                {chapter.chapterTitle}
              </AccordionTrigger>

              <AccordionContent className="pb-0">
                <div className="space-y-1 pt-1">
                  {chapter.lessons.map((lesson) => {
                    const isActive = lesson.id === currentLessonId;
                    const completedLessonIds =
                      enrollmentInfo.completedLessonIds;

                    // 완료된 레슨인지 체크하는 부분
                    const isCompleted = completedLessonIds
                      ? enrollmentInfo.completedLessonIds.some(
                          (cl: number) => cl === Number(lesson.id),
                        )
                      : false;

                    return (
                      <AsideLesson
                        key={lesson.id}
                        lesson={lesson}
                        isActive={isActive}
                        isCompleted={isCompleted}
                        onClick={() => handleClickLesson(lesson.id)}
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
