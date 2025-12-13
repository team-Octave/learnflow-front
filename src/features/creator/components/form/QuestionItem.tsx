'use client';

import { useFormContext, Controller } from 'react-hook-form';
import { CurriculumFormValues } from '../../types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface QuestionItemProps {
  chapterIndex: number;
  lessonIndex: number;
  questionIndex: number;
  removeQuestion: () => void;
}

export default function QuestionItem({
  chapterIndex,
  lessonIndex,
  questionIndex,
  removeQuestion,
}: QuestionItemProps) {
  const { register, control } = useFormContext<CurriculumFormValues>();

  // 경로: chapters[i].lessons[j].quizQuestions[k]
  // 주의: types.ts에서 quizQuestions가 null일 수도 있다고 선언했지만,
  // 폼 초기화 시 []로 변환했으므로 여기서는 접근 가능하다고 가정합니다.
  const basePath =
    `chapters.${chapterIndex}.lessons.${lessonIndex}.quizQuestions.${questionIndex}` as const;

  return (
    <div className="flex gap-3 items-start bg-zinc-950 p-3 rounded border border-zinc-800">
      <div className="flex-1 space-y-3">
        {/* 문제 텍스트 */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-zinc-500 w-4">
            Q{questionIndex + 1}
          </span>
          <Input
            {...register(`${basePath}.questionText`, { required: true })}
            placeholder="문제를 입력하세요"
            className="h-8 text-sm"
          />
        </div>

        {/* 정답 선택 (O/X) */}
        <div className="flex items-center gap-4 pl-6">
          <span className="text-xs text-zinc-500">정답:</span>
          <Controller
            control={control}
            name={`${basePath}.answer`}
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="O" id={`${basePath}-O`} />
                  <Label
                    htmlFor={`${basePath}-O`}
                    className="text-sm cursor-pointer"
                  >
                    O
                  </Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="X" id={`${basePath}-X`} />
                  <Label
                    htmlFor={`${basePath}-X`}
                    className="text-sm cursor-pointer"
                  >
                    X
                  </Label>
                </div>
              </RadioGroup>
            )}
          />
        </div>
      </div>

      {/* 삭제 버튼 */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-6 w-6 text-zinc-600 hover:text-red-400"
        onClick={removeQuestion}
      >
        <X size={14} />
      </Button>
    </div>
  );
}
