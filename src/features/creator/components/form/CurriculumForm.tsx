'use client';

import {
  useForm,
  FormProvider,
  useFieldArray,
  SubmitHandler,
} from 'react-hook-form';
import { Chapter, CurriculumFormValues } from '../../types';
import { Lecture } from '@/features/lectures/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ChapterItem from './ChapterItem';

interface CurriculumFormProps {
  lecture: Lecture;
}

const DEFAULT_CHAPTER: Chapter = {
  chapterTitle: '',
  order: 0,
  lessons: [],
};

export default function CurriculumForm({ lecture }: CurriculumFormProps) {
  // 1. 초기 데이터 설정 (null 값 처리 포함)
  const methods = useForm<CurriculumFormValues>({
    defaultValues: {
      chapters: lecture.chapters?.map((chapter) => ({
        ...chapter,
        lessons:
          chapter.lessons?.map((lesson) => ({
            ...lesson,
            quizQuestions: lesson.questions || [],
          })) || [],
      })) || [DEFAULT_CHAPTER],
    },
    mode: 'onChange',
  });

  const { control, handleSubmit } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'chapters',
  });

  const onSubmit: SubmitHandler<CurriculumFormValues> = (data) => {
    // 제출 전 order 값 재정렬 로직이 필요하다면 여기서 처리
    const formattedData = data.chapters.map((chapter, cIdx) => ({
      ...chapter,
      order: cIdx, // 배열 순서대로 order 덮어쓰기
      lessons: chapter.lessons.map((lesson, lIdx) => ({
        ...lesson,
        order: lIdx,
        quizQuestions:
          lesson.quizQuestions?.map((q, qIdx) => ({
            ...q,
            order: qIdx,
          })) || [],
      })),
    }));

    console.log('서버로 전송할 데이터:', formattedData);
  };

  return (
    <FormProvider {...methods}>
      <form id="curriculum-form" onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">커리큘럼 구성</CardTitle>
            <CardDescription>
              챕터와 레슨을 추가하여 커리큘럼을 완성하세요
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {fields.map((field, idx) => (
              <ChapterItem
                key={field.id}
                chapterIndex={idx}
                removeChapter={() => remove(idx)}
              />
            ))}
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() =>
                append({ ...DEFAULT_CHAPTER, order: fields.length })
              }
            >
              + 챕터 추가
            </Button>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
}
