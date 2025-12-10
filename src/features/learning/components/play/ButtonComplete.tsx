'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface ButtonCompleteProps {
  lessonId: string;
}

export default function ButtonComplete({ lessonId }: ButtonCompleteProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  // 레슨 완료 여부 체크
  useEffect(() => {
    const stored = localStorage.getItem('completedLessons');
    if (!stored) return;

    try {
      const completedList: string[] = JSON.parse(stored);
      if (completedList.includes(lessonId)) {
        setIsCompleted(true);
      }
    } catch (err) {
      console.error('localStorage parsing error:', err);
    }
  }, [lessonId]);

  // 완료 처리
  const handleComplete = () => {
    const stored = localStorage.getItem('completedLessons');
    let list: string[] = [];

    if (stored) {
      try {
        list = JSON.parse(stored);
      } catch (err) {
        console.error('localStorage parsing error:', err);
      }
    }

    if (!list.includes(lessonId)) {
      list.push(lessonId);
      localStorage.setItem('completedLessons', JSON.stringify(list));
    }

    setIsCompleted(true);
  };

  return (
    <div className="flex justify-end pt-4 border-t border-zinc-800">
      <Button
        onClick={handleComplete}
        disabled={isCompleted}
        className={`font-bold px-8 py-6 text-lg
          ${
            isCompleted
              ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }
        `}
      >
        {isCompleted ? '완료됨' : '수강 완료하기'}
      </Button>
    </div>
  );
}
