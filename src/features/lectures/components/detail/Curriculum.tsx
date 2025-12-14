// src/features/lectures/components/detail/Curriculum.tsx

'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { Chapter } from '../../types';
import Lesson from './Lesson';

interface Props {
  curriculum: Chapter[];
}

export default function Curriculum({ curriculum }: Props) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">강의 목차</h2>
        <span className="text-sm text-zinc-400">
          {' '}
          총 {curriculum.length}개 챕터
        </span>
      </div>

      {curriculum.length > 0 ? (
        <Accordion
          type="multiple"
          defaultValue={curriculum.map((c) => String(c.id))} // ← 모든 아이템 오픈
          className="w-full space-y-4"
        >
          {curriculum.map((chapter) => (
            <AccordionItem
              key={chapter.id}
              value={String(chapter.id)}
              className="border border-zinc-800 rounded-lg px-4 bg-zinc-900/30"
            >
              <AccordionTrigger className="hover:no-underline py-4 text-left">
                <span className="font-semibold">{chapter.chapterTitle}</span>
              </AccordionTrigger>

              <AccordionContent className="pb-4">
                <div className="space-y-2 pt-2">
                  {chapter.lessons.map((lesson) => (
                    <Lesson key={lesson.id} lesson={lesson} />
                  ))}
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
  );
}
