import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import QuestionItem from './QuestionItem';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { CurriculumFormValues } from '../../schemas';

interface QuizItemProps {
  lessonPath: string;
}

export default function QuizItem({ lessonPath }: QuizItemProps) {
  const { control } = useFormContext<CurriculumFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `${lessonPath}.quizQuestions` as any,
  });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-xs text-zinc-400">퀴즈 문제 목록</Label>
        <Button
          className="cursor-pointer"
          type="button"
          size="sm"
          variant="secondary"
          onClick={() => {
            append({
              question: '',
              correct: true,
              questionOrder: fields.length + 1,
            });
          }}
        >
          + 문제 추가
        </Button>
      </div>

      <div className="space-y-3">
        {fields.map((field, qIdx) => (
          <QuestionItem
            key={field.id}
            lessonPath={lessonPath}
            questionIndex={qIdx}
            removeQuestion={() => {
              remove(qIdx);
            }}
          />
        ))}
      </div>
    </div>
  );
}
