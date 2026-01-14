'use client';

import { useFormContext, Controller } from 'react-hook-form';
import { CurriculumFormValues } from '../../schemas';
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
  const basePath =
    `chapters.${chapterIndex}.lessons.${lessonIndex}.quizQuestions.${questionIndex}` as const;

  return (
    <div className="flex items-start gap-3 p-3 bg-zinc-950 rounded border border-zinc-800">
      <span className="text-xs font-bold text-zinc-500 pt-2">
        Q{questionIndex + 1}
      </span>

      <div className="flex-1 space-y-3">
        <Input
          {...register(`${basePath}.question`, { required: true })}
          placeholder="문제를 입력하세요"
          className="h-9"
        />

        <div className="flex items-center gap-4">
          <span className="text-xs text-zinc-400">정답:</span>
          <Controller
            control={control}
            name={`${basePath}.correct`}
            render={({ field }) => (
              <RadioGroup
                className="flex gap-4"
                value={field.value ? 'O' : 'X'}
                onValueChange={(val) => field.onChange(val === 'O')}
              >
                <div className="flex items-center space-x-1">
                  <RadioGroupItem
                    value="O"
                    id={`${basePath}-O-${questionIndex}`}
                  />
                  <Label htmlFor={`${basePath}-O-${questionIndex}`}>O</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem
                    value="X"
                    id={`${basePath}-X-${questionIndex}`}
                  />
                  <Label htmlFor={`${basePath}-X-${questionIndex}`}>X</Label>
                </div>
              </RadioGroup>
            )}
          />
        </div>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-zinc-500 hover:text-red-400"
        onClick={removeQuestion}
      >
        <X size={16} />
      </Button>
    </div>
  );
}
