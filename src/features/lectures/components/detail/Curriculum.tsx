// src/features/lectures/components/detail/Curriculum.tsx
/*
왼쪽에 강의 목차(챕터 + 레슨 리스트)
👉 오른쪽에 선택된 레슨 기준으로 AI 요약 박스
를 동시에 관리하는 컨테이너 컴포넌트
*/

'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { AILessonSummary, Chapter } from '../../types';
import Lesson from './Lesson';
import AISummaryBox from './AISummaryBox';

interface CurriculumProps {
  curriculum: Chapter[];
  aiLessonSummaries: AILessonSummary[];
}

export default function Curriculum({
  curriculum,
  aiLessonSummaries,
}: CurriculumProps) {
  // 지금 사용자가 클릭한 레슨의 id를 저장, 처음엔 아무 것도 선택 안 했으니까 null
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
        <div className="lg:flex-[7]">
          {/* 커리큘럼이 있을 때 / 없을 때 분기 */}
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
                    <span className="font-semibold">
                      {chapter.chapterTitle}
                    </span>
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
                            onClick={
                              isVideo
                                ? () => setSelectedLessonId(lesson.id)
                                : undefined
                            }
                            disabled={!isVideo}
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
        </div>

        {/* 오른쪽: AI 요약 */}
        <div className="lg:flex-[3]">
          {/* AI 요약 박스 연결 : selectedLessonId 보고 판단 */}
          <AISummaryBox
            selectedLessonId={selectedLessonId}
            aiLessonSummaries={aiLessonSummaries}
          />
        </div>
      </div>
    </section>
  );
}
