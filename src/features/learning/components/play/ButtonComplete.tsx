// src/features/learning/components/play/Video/ButtonComplete.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ButtonCompleteProps {
  lessonId: string;
}

export default function ButtonComplete({ lessonId }: ButtonCompleteProps) {
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    if (loading) return;
    setLoading(true);

    try {
      // TODO: 나중에 learning.service의 "특정 레슨 완료" API 호출
      // await completeLesson(lessonId);
      console.log('lesson completed:', lessonId);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size="sm"
      disabled={loading}
      onClick={handleComplete}
      className="rounded-full"
    >
      {loading ? '처리 중...' : '수강 완료'}
    </Button>
  );
}
