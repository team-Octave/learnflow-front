// src/features/learning/components/play/AsideCurriculum.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation'; // ✅ useSearchParams 추가
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

  const completedLessonId = searchParams.get('completedLessonId'); // ✅ 퀴즈에서 셋한 값

  const allLessons = lecture.curriculum.flatMap((section) => section.lessons);

  const currentIndex = allLessons.findIndex(
    (lesson) => lesson.id === currentLessonId,
  );

  const totalLessons = allLessons.length;
  const completedCount = currentIndex === -1 ? 0 : Math.max(0, currentIndex);
  const computedProgress =
    totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100);

  const progressValue =
    typeof progressRate === 'number' ? progressRate : computedProgress;

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
                    const lessonIndex = allLessons.findIndex(
                      (l) => l.id === lesson.id,
                    );

                    // 기존: 현재 레슨 이전 것들만 완료
                    const isCompletedByOrder =
                      lessonIndex !== -1 && lessonIndex < currentIndex;

                    // ✅ 퀴즈 제출로 URL에 찍힌 레슨
                    const isCompletedByQuiz = completedLessonId === lesson.id;

                    const isCompleted = isCompletedByOrder || isCompletedByQuiz;

                    return (
                      <AsideLesson
                        key={lesson.id}
                        lesson={lesson}
                        isActive={isActive}
                        isCompleted={isCompleted}
                        onClick={() => {
                          onSelectLesson?.(lesson.id);
                          // 다른 레슨 클릭 시에는 쿼리스트링 없이 이동 (필요하면 여기서도 조정 가능)
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
