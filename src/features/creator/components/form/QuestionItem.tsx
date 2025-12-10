'use client';

import { Input } from '@/components/ui/input';
import { Lesson, Question } from '../../types';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dispatch, SetStateAction, useState } from 'react';

interface QuestionItemProps {
  lesson: Partial<Lesson>;
  order: number;
  setLesson: Dispatch<SetStateAction<Partial<Lesson>>>;
}

export default function QuestionItem({
  lesson,
  order,
  setLesson,
}: QuestionItemProps) {
  const handleQuestionTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const changedQuestionText = e.target.value;
    setLesson((prev) => ({
      ...prev,
      questions: prev.questions!.map((question, idx) => {
        if (idx === order - 1)
          return { ...question, questionText: changedQuestionText };
        return question;
      }),
    }));
  };
  const handleAnswerChange = (changedAnswer: 'O' | 'X') => {
    setLesson((prev) => ({
      ...prev,
      questions: prev.questions!.map((question, idx) => {
        if (idx === order - 1) return { ...question, answer: changedAnswer };
        return question;
      }),
    }));
  };

  return (
    <div className="flex flex-col p-3 border rounded gap-3">
      <div className="flex flex-col gap-1">
        <div className="text-sm text-white">문제 {order}</div>
        <Input
          placeholder="문제를 입력하세요"
          value={lesson.questions![order - 1].questionText}
          onChange={handleQuestionTextChange}
          // TODO: 문제 텍스트 수정 로직 작성
        />
      </div>
      <div className="flex gap-3 px-3">
        <div className="text-sm text-white">정답: </div>
        <RadioGroup
          defaultValue={lesson.questions![order - 1].answer}
          onValueChange={handleAnswerChange}
          // TODO: 문제 정답 수정 로직 작성
          className="flex"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="O" id="O" className="cursor-pointer" />
            <Label htmlFor="O">O</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="X" id="X" className="cursor-pointer" />
            <Label htmlFor="X">X</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
