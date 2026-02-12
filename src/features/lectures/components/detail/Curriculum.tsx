// src/features/lectures/components/detail/Curriculum.tsx

'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { Chapter } from '../../types';
import Lesson from './Lesson';
import AISummaryBox from './AISummaryBox';

interface CurriculumProps {
  curriculum: Chapter[];
}

export default function Curriculum({ curriculum }: CurriculumProps) {
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">강의 목차</h2>
        <span className="text-sm text-zinc-400">
          총 {curriculum.length}개 챕터
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* 왼쪽: 목차 */}
        {/* 커리큘럼이 있을 때 vs 없을 때 */}
        <section className="lg:flex-7">
          {curriculum.length > 0 ? (
            <Accordion
              type="multiple"
              defaultValue={curriculum.map((c) => c.id.toString())}
              className="w-full space-y-4"
            >
              {curriculum.map((chapter) => (
                <AccordionItem
                  key={chapter.id}
                  value={chapter.id.toString()}
                  className="border border-zinc-800 rounded-lg px-4 bg-zinc-900/30"
                >
                  <AccordionTrigger className="hover:no-underline py-4 text-left">
                    <p className="font-semibold">{chapter.chapterTitle}</p>
                  </AccordionTrigger>

                  <AccordionContent className="pb-4">
                    <div className="space-y-2 pt-2">
                      {chapter.lessons.map((lesson) => {
                        const isVideo =
                          lesson.lessonTypeDisplayName === 'VIDEO';

                        return (
                          <Lesson
                            key={lesson.id}
                            lesson={lesson}
                            isActive={selectedLessonId === lesson.id}
                            // VIDEO만 클릭 이벤트 부여, QUIZ는 onClick 자체가 없음
                            onClick={
                              isVideo
                                ? () => setSelectedLessonId(lesson.id)
                                : undefined
                            }
                          />
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-12 text-zinc-400 bg-zinc-900/30 rounded-lg border border-zinc-800 border-dashed">
              커리큘럼 준비 중입니다.
            </div>
          )}
        </section>

        {/* 오른쪽: AI 요약 */}
        <section className="lg:flex-3">
          <AISummaryBox selectedLessonId={selectedLessonId} />
        </section>
      </div>
    </section>
  );
}
