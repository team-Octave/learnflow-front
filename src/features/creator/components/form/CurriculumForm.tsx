'use client';

import {
  useForm,
  FormProvider,
  useFieldArray,
  SubmitHandler,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { useCallback, useRef, useTransition } from 'react';
import { bindCurriculumAction, createCurriculumAction } from '../../actions';
import { useRouter } from 'next/navigation';
import {
  CurriculumFormSchema,
  CurriculumFormValues,
  Chapter,
} from '../../schemas';
import { toast } from 'sonner';

interface CurriculumFormProps {
  lecture: Lecture;
}

// 초기값 상수
const DEFAULT_CHAPTER: Chapter = {
  id: null,
  chapterTitle: '',
  lessons: [],
};

export default function CurriculumForm({ lecture }: CurriculumFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // 열린 레슨 추적용 Set (lessonPath를 키로 사용)
  const openLessonsRef = useRef<Set<string>>(new Set());

  const registerOpenLesson = useCallback((lessonPath: string) => {
    openLessonsRef.current.add(lessonPath);
  }, []);

  const unregisterOpenLesson = useCallback((lessonPath: string) => {
    openLessonsRef.current.delete(lessonPath);
  }, []);

  const methods = useForm<CurriculumFormValues>({
    resolver: zodResolver(CurriculumFormSchema), // Zod 연결
    defaultValues: {
      chapters: [{ id: null, chapterTitle: '', lessons: [] }],
    },
    mode: 'onChange', // 실시간 검증 활성화
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'chapters',
  });

  const onSubmit: SubmitHandler<CurriculumFormValues> = (data) => {
    // 열린 레슨이 있는지 확인
    if (openLessonsRef.current.size > 0) {
      toast.error('모든 레슨을 저장해야 합니다.');
      return;
    }

    // payload 변환
    const payload = {
      chapters: data.chapters.map((chapter, chapterIdx) => ({
        chapterId: chapter.id,
        order: chapterIdx,
        lessons: chapter.lessons.map((lesson, lessonIdx) => ({
          lessonId: lesson.id,
          order: lessonIdx,
        })),
      })),
    };

    startTransition(async () => {
      const state = await bindCurriculumAction(lecture.id, payload);
      if (state.success) {
        toast.success('커리큘럼이 저장되었습니다.');
        router.push('/creator');
      } else {
        toast.error(state.message || '커리큘럼 저장에 실패했습니다.');
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
                lectureId={lecture.id}
                chapterIndex={idx}
                removeChapter={() => remove(idx)}
                registerOpenLesson={registerOpenLesson}
                unregisterOpenLesson={unregisterOpenLesson}
              />
            ))}
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button
              type="button"
              variant="outline"
              className="w-full cursor-pointer"
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
