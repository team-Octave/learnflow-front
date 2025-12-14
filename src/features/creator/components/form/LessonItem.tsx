'use client';

import { useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { CurriculumFormValues } from '../../types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Edit,
  Trash2,
  PlayCircle,
  FileQuestion,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import QuestionItem from './QuestionItem';

interface LessonItemProps {
  chapterIndex: number;
  lessonIndex: number;
  removeLesson: () => void;
}

export default function LessonItem({
  chapterIndex,
  lessonIndex,
  removeLesson,
}: LessonItemProps) {
  const { register, control, watch, setValue } =
    useFormContext<CurriculumFormValues>();
  const [isOpen, setIsOpen] = useState(true);

  // 경로 설정
  const lessonPath = `chapters.${chapterIndex}.lessons.${lessonIndex}` as const;

  // 값 관찰
  const lessonType = watch(`${lessonPath}.lessonType`);
  const lessonTitle = watch(`${lessonPath}.lessonTitle`);

  // 퀴즈용 Field Array (항상 호출)
  const { fields, append, remove } = useFieldArray({
    control,
    name: `${lessonPath}.quizQuestions` as any,
  });

  return (
    <div className="border border-zinc-800 rounded-md bg-zinc-900 overflow-hidden">
      {/* 레슨 요약 헤더 (항상 보임) */}
      <div className="flex items-center gap-3 p-3 bg-zinc-900 hover:bg-zinc-800/50 transition-colors">
        {lessonType === 'VIDEO' ? (
          <PlayCircle className="text-indigo-500 h-5 w-5" />
        ) : (
          <FileQuestion className="text-teal-500 h-5 w-5" />
        )}

        <span className="flex-1 font-medium text-sm text-zinc-200">
          {lessonTitle || '제목 없는 레슨'}
        </span>

        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <ChevronUp size={16} /> : <Edit size={16} />}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-zinc-500 hover:text-red-400"
            onClick={removeLesson}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>

      {/* 상세 수정 영역 (Accordion) */}
      {isOpen && (
        <div className="p-4 bg-zinc-900/50 border-t border-zinc-800 space-y-4">
          {/* 공통: 제목 및 무료 공개 설정 */}
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-zinc-400">레슨 제목</Label>
              <Input
                {...register(`${lessonPath}.lessonTitle`, { required: true })}
                placeholder="레슨 제목 입력"
                className="mt-1"
              />
            </div>
          </div>

          <Separator className="bg-zinc-800" />

          {/* VIDEO 타입 전용 UI */}
          {lessonType === 'VIDEO' && (
            <div className="space-y-2">
              <Label className="text-xs text-zinc-400">비디오 URL</Label>
              <Input
                {...register(`${lessonPath}.videoUrl`)}
                placeholder="https://..."
              />
              <p className="text-[10px] text-zinc-500">
                영상 파일 업로드 대신 URL을 입력해주세요.
              </p>
            </div>
          )}

          {/* QUIZ 타입 전용 UI */}
          {lessonType === 'QUIZ' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-zinc-400">퀴즈 문제 목록</Label>
                <Button
                  // ... props
                  onClick={() =>
                    append({
                      question: '', // 변경
                      correct: true, // 변경 (기본값 True)
                      questionOrder: fields.length + 1, // 변경 (1부터 시작)
                    })
                  }
                >
                  + 문제 추가
                </Button>
              </div>

              <div className="space-y-3">
                {fields.map((field, qIdx) => (
                  <QuestionItem
                    key={field.id}
                    chapterIndex={chapterIndex}
                    lessonIndex={lessonIndex}
                    questionIndex={qIdx}
                    removeQuestion={() => remove(qIdx)}
                  />
                ))}
                {fields.length === 0 && (
                  <div className="text-center py-4 text-xs text-zinc-600 border border-dashed border-zinc-800 rounded">
                    등록된 문제가 없습니다.
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <Button size="sm" onClick={() => setIsOpen(false)}>
              닫기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
