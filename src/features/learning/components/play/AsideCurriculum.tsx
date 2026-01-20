// src/features/learning/components/play/AsideCurriculum.tsx
'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import type { Lecture } from '@/features/lectures/types';
import { AsideLesson } from './AsideLesson';
import type { Enrollment } from '../../types';

interface AsideCurriculumProps {
  lecture: Lecture;
  enrollmentInfo: Enrollment;
}

export function AsideCurriculum({
  lecture,
  enrollmentInfo,
}: AsideCurriculumProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentLessonId = searchParams.get('lessonId');

  const handleClickLesson = (lessonId: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('lessonId', String(lessonId));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <aside className="flex flex-col w-96 h-[calc(100vh-64px)] border-l border-zinc-800 bg-zinc-900/50">
      <div className="p-4 border-b border-zinc-800">
        <h2 className="font-bold text-lg mb-1">커리큘럼</h2>

        <div className="progress">
          <div className="flex justify-between text-xs text-zinc-400 mb-1">
            <p>진도율</p>
            <span>{enrollmentInfo.progress ?? 0}% 완료</span>
          </div>
          <Progress value={enrollmentInfo.progress ?? 0} className="h-2" />
        </div>
      </div>

      <div
        className="flex-1 overflow-y-auto p-4
      [&::-webkit-scrollbar]:hidden
      [scrollbar-width:none]
      [-ms-overflow-style:none]"
      >
        <Accordion
          type="multiple"
          defaultValue={lecture.chapters?.map((c) => String(c.id))}
          className="space-y-4"
        >
          {lecture.chapters?.map((chapter) => (
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
                    const isActive =
                      String(lesson.id) === String(currentLessonId);

                    const isCompleted =
                      enrollmentInfo.completedLessonIds?.includes(lesson.id) ??
                      false;

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
