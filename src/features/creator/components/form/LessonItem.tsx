'use client';

import { Button } from '@/components/ui/button';
import { Lesson } from '../../types';
import { Edit, PenLine, PlayCircle, Save, Trash } from 'lucide-react';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import QuestionItem from './QuestionItem';

interface LessonItemProps {
  initialLesson?: Lesson;
  order: number;
  type?: 'QUIZ' | 'VIDEO'; // 신규 레슨 생성 시 전달
}

const DEFAULT_QUIZ_LESSON: Omit<Lesson, 'lessonId'> = {
  lessonTitle: '',
  lessonOrder: 1,
  lessonType: 'VIDEO',
  questions: [
    {
      questionText: '',
      answer: 'O',
      questionOrder: 1,
    },
  ],
};

const DEFAULT_VIDEO_LESSON: Omit<Lesson, 'lessonId'> = {
  lessonTitle: '',
  lessonOrder: 1,
  lessonType: 'VIDEO',
  videoURL: '',
  duration: '10:00',
};

export default function LessonItem({
  initialLesson,
  order,
  type,
}: LessonItemProps) {
  const isEmpty = !initialLesson;
  const [isOpen, setIsOpen] = useState<boolean>(isEmpty);
  const [lesson, setLesson] = useState<Partial<Lesson>>(
    initialLesson ||
      (type === 'VIDEO' ? DEFAULT_VIDEO_LESSON : DEFAULT_QUIZ_LESSON),
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLesson((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex flex-col border rounded bg-zinc-900 p-3">
      <div className="flex items-center gap-2 ">
        {lesson?.lessonType === 'VIDEO' ? (
          <PlayCircle size={20} className="text-indigo-500" />
        ) : (
          <PenLine size={20} className="text-teal-500" />
        )}
        <div className="flex-1">{lesson.lessonTitle || `레슨 제목`}</div>
        <div className="gap-1">
          <Button
            type="button"
            variant="ghost"
            size={'icon'}
            className="cursor-pointer hover:text-zinc-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Edit />
          </Button>
          <Button
            type="button"
            variant={'ghost'}
            size={'icon'}
            className="text-red-400 hover:text-red-500 cursor-pointer"
            onClick={() => {
              // TODO: 레슨 삭제 로직 작성
            }}
          >
            <Trash />
          </Button>
        </div>
      </div>
      {isOpen && <Separator className="mt-4" />}
      {/* 접히는 부분 */}
      {isOpen &&
        (lesson?.lessonType === 'QUIZ' || type === 'QUIZ' ? (
          <div className="flex flex-col p-4 gap-3">
            <div className="flex flex-col gap-2">
              <Label className="text-zinc-300 text-sm">레슨 제목</Label>
              <Input
                placeholder="레슨 제목"
                name="lessonTitle"
                value={lesson.lessonTitle}
                onChange={handleChange}
                // TODO  레슨 제목 변경 로직 작성
              />
            </div>
            <div className="text-zinc-300 text-sm">OX 퀴즈 문제 목록</div>
            {lesson.questions!.map((question, idx) => (
              <QuestionItem
                key={question.questionId}
                lesson={lesson}
                order={idx + 1}
                setLesson={setLesson}
              />
            ))}
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                className="cursor-pointer text-zinc-800 bg-white hover:bg-white/90"
                onClick={() => {
                  // TODO 문제 추가 버튼 로직 작성
                }}
              >
                문제 추가
              </Button>
              <Button
                type="button"
                className="text-white hover:text-white cursor-pointer bg-indigo-600 hover:bg-indigo-600/90"
                onClick={() => setIsOpen(false)}
              >
                <Save /> 저장 완료
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col p-4 gap-3">
            <div className="flex flex-col gap-2">
              <Label className="text-zinc-300 text-sm">레슨 제목</Label>
              <Input
                placeholder="레슨 제목"
                name="lessonTitle"
                value={lesson.lessonTitle}
                onChange={handleChange}
                // TODO  레슨 제목 변경 로직 작성
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-zinc-300 text-sm">영상 업로드</Label>
              <Input type="file" className="cursor-pointer" />
            </div>
            <div className="flex justify-end">
              <Button
                type="button"
                className="text-white hover:text-white cursor-pointer bg-indigo-600 hover:bg-indigo-600/90"
                onClick={() => setIsOpen(false)}
              >
                <Save /> 저장 완료
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
}
