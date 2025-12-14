'use client';

import { useFormContext, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lesson, CurriculumFormValues } from '../../types';
import LessonItem from './LessonItem';
import { PencilLine, PlayCircle, Trash2 } from 'lucide-react';

interface ChapterItemProps {
  chapterIndex: number;
  removeChapter: () => void;
}

// VIDEO 초기값: quizQuestions = null
const INIT_VIDEO_LESSON: Lesson = {
  lessonTitle: '',
  lessonType: 'VIDEO',
  isFreePreview: true,
  videoUrl: 'https://www.youtube.com/watch?v=LclObYwGj90',
  quizQuestions: null,
};

// QUIZ 초기값: videoUrl = null, 기본 문제 1개 포함
const INIT_QUIZ_LESSON: Lesson = {
  lessonTitle: '',
  lessonType: 'QUIZ',
  isFreePreview: true,
  videoUrl: null,
  quizQuestions: [{ question: '', correct: true, questionOrder: 1 }],
};
export default function ChapterItem({
  chapterIndex,
  removeChapter,
}: ChapterItemProps) {
  const { register, control } = useFormContext<CurriculumFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `chapters.${chapterIndex}.lessons`,
  });

  return (
    <div className="flex flex-col p-4 border border-zinc-700 rounded-lg gap-4 bg-zinc-950/50">
      {/* 챕터 헤더 */}
      <div className="flex items-center gap-3">
        <div className="font-semibold text-zinc-400 w-20">
          Chapter {chapterIndex + 1}
        </div>
        <Input
          placeholder="챕터 제목을 입력하세요"
          {...register(`chapters.${chapterIndex}.chapterTitle`, {
            required: true,
          })}
          className="flex-1"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={removeChapter}
          className="text-zinc-500 hover:text-red-500"
        >
          <Trash2 size={18} />
        </Button>
      </div>

      {/* 레슨 목록 */}
      <div className="flex flex-col gap-3 pl-4 border-l-2 border-zinc-800 ml-2">
        {fields.map((field, lessonIdx) => (
          <LessonItem
            key={field.id}
            chapterIndex={chapterIndex}
            lessonIndex={lessonIdx}
            removeLesson={() => remove(lessonIdx)}
          />
        ))}
      </div>

      {/* 레슨 추가 버튼 그룹 */}
      <div className="flex gap-2 mt-2">
        <Button
          type="button"
          variant="outline"
          className="flex-1 border-dashed text-zinc-400 hover:text-indigo-400 hover:border-indigo-400"
          onClick={() => append(INIT_VIDEO_LESSON)}
        >
          <PlayCircle className="mr-2 h-4 w-4" /> 영상 레슨 추가
        </Button>
        <Button
          type="button"
          variant="outline"
          className="flex-1 border-dashed text-zinc-400 hover:text-teal-400 hover:border-teal-400"
          onClick={() => append(INIT_QUIZ_LESSON)}
        >
          <PencilLine className="mr-2 h-4 w-4" /> 퀴즈 레슨 추가
        </Button>
      </div>
    </div>
  );
}
