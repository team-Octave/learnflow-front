'use client';

import {
  useForm,
  FormProvider,
  useFieldArray,
  SubmitHandler,
} from 'react-hook-form';
import { CreatorChapter, CurriculumFormValues } from '../../types';
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
import { useTransition } from 'react';
import { createCurriculumAction } from '../../actions';
import { useRouter } from 'next/navigation';

interface CurriculumFormProps {
  lecture: Lecture;
}

// 초기값 상수
const DEFAULT_CHAPTER: CreatorChapter = {
  chapterTitle: '',
  lessons: [],
};

export default function CurriculumForm({ lecture }: CurriculumFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const methods = useForm<CurriculumFormValues>({
    defaultValues: {
      chapters: [DEFAULT_CHAPTER],
    },
    mode: 'onChange',
  });

  const { control, handleSubmit } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'chapters',
  });

  const onSubmit: SubmitHandler<CurriculumFormValues> = (data) => {
    // 서버 전송 전 데이터 클린업 (불필요한 필드 null 처리)
    const formattedData = {
      chapters: data.chapters.map((chapter) => ({
        ...chapter,
        lessons: chapter.lessons.map((lesson) => {
          // VIDEO: quizQuestions 제거
          if (lesson.lessonType === 'VIDEO') {
            return {
              ...lesson,
              quizQuestions: null,
            };
          }
          // QUIZ: videoUrl 제거 및 order 재정렬
          if (lesson.lessonType === 'QUIZ') {
            return {
              ...lesson,
              videoUrl: null,
              quizQuestions:
                lesson.quizQuestions?.map((q, idx) => ({
                  ...q,
                  questionOrder: idx + 1,
                })) || [],
            };
          }
          return lesson;
        }),
      })),
    };

    console.log('커리큘럼 요청 전:', JSON.stringify(formattedData, null, 2));
    // API 호출 로직...
    startTransition(async () => {
      const response = await createCurriculumAction(lecture.id, formattedData);
      if (!response.success) {
        alert(response.error);
        return;
      } else {
        alert('강의 등록이 완료되었습니다.');
        router.replace(`/creator`);
      }
    });
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
              onClick={() => append(DEFAULT_CHAPTER)}
            >
              + 챕터 추가
            </Button>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
}
