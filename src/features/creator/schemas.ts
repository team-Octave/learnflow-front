import { z } from 'zod';

// 퀴즈 문제 스키마
export const QuizQuestionSchema = z.object({
  id: z.number().nullable().optional(),
  question: z.string().min(1, '문제를 입력하세요.'),
  correct: z.boolean(),
  questionOrder: z.number(),
});

// 레슨 스키마 (Union을 통한 타입 안전성)
export const LessonSchema = z.discriminatedUnion('lessonType', [
  z.object({
    id: z.number().nullable().optional(),
    lessonType: z.literal('VIDEO'),
    lessonTitle: z.string().min(1, '레슨 제목을 입력하세요.'),
    videoUrl: z.string().url('유효한 URL이 아닙니다.'),
    isFreePreview: z.boolean(),
    quizQuestions: z.null().optional(),
  }),
  z.object({
    id: z.number().nullable().optional(),
    lessonType: z.literal('QUIZ'),
    lessonTitle: z.string().min(1, '레슨 제목을 입력하세요.'),
    videoUrl: z.null().optional(),
    isFreePreview: z.boolean(),
    quizQuestions: z
      .array(QuizQuestionSchema)
      .min(1, '최소 1개의 문제가 필요합니다.'),
  }),
]);

// 챕터 스키마
export const ChapterSchema = z.object({
  id: z.number().nullable().optional(),
  chapterTitle: z.string().min(1, '챕터 제목을 입력하세요.'),
  lessons: z.array(LessonSchema),
});

// 전체 폼 스키마
export const CurriculumFormSchema = z.object({
  chapters: z.array(ChapterSchema).min(1, '최소 1개의 챕터가 필요합니다.'),
});

export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;
export type Lesson = z.infer<typeof LessonSchema>;
export type Chapter = z.infer<typeof ChapterSchema>;
export type CurriculumFormValues = z.infer<typeof CurriculumFormSchema>;
