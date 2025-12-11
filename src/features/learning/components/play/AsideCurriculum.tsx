// src/features/learning/components/play/AsideCurriculum.tsx
'use client';

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
  // 백엔드에서 오는 진도율 (없으면 내부에서 계산)
  progressRate?: number;
  // 🔥 추가: 레슨 클릭되었을 때 호출되는 콜백
  onSelectLesson?: (lessonId: string) => void;
}

export function AsideCurriculum({
  lecture,
  currentLessonId,
  progressRate,
  onSelectLesson,
}: AsideCurriculumProps) {
  // 전체 레슨 평탄화
  const allLessons = lecture.curriculum.flatMap((section) => section.lessons);

  // 현재 레슨 인덱스
  const currentIndex = allLessons.findIndex(
    (lesson) => lesson.id === currentLessonId,
  );

  const totalLessons = allLessons.length;
  const completedCount = currentIndex === -1 ? 0 : Math.max(0, currentIndex);
  const computedProgress =
    totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100);

  // 백엔드에서 progressRate를 내려주면 그걸 우선 사용
  const progressValue =
    typeof progressRate === 'number' ? progressRate : computedProgress;

  return (
    <aside className="hidden lg:flex w-96 flex-col border-l border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
      {/* 상단: 제목 + 진행률 */}
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-lg">커리큘럼</h2>
          <p className="text-xs text-zinc-400 truncate max-w-[220px]">
            {lecture.title}
          </p>
        </div>

        <div className="flex flex-col items-end gap-1 text-xs text-zinc-400">
          <div className="flex items-center gap-2 w-32">
            <Progress value={progressValue} className="h-2" />
          </div>
          <span>{progressValue}% 완료</span>
        </div>
      </div>

      {/* 커리큘럼 리스트 */}
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
                    const isCompleted =
                      lessonIndex !== -1 && lessonIndex < currentIndex;

                    return (
                      <AsideLesson
                        key={lesson.id}
                        lesson={lesson}
                        isActive={isActive}
                        isCompleted={isCompleted}
                        // 🔥 클릭 시 상위에서 내려준 콜백 호출
                        onClick={() => onSelectLesson?.(lesson.id)}
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
