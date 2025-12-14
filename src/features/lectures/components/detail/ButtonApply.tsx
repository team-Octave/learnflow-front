'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface Props {
  lectureId: number;
}

export default function ButtonApply({ lectureId }: Props) {
  const router = useRouter();
  const [isLearning, setIsLearning] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('learnedLectures');
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);

      // ✅ 안전하게 number[]로 정규화
      const list: number[] = Array.isArray(parsed)
        ? parsed.map((v) => Number(v)).filter((v) => !Number.isNaN(v))
        : [];

      setIsLearning(list.includes(lectureId));
    } catch (err) {
      console.error('localStorage 파싱 실패:', err);
    }
  }, [lectureId]);

  const handleApply = () => {
    const confirmed = confirm(
      '수강 신청이 완료되었습니다. 내 학습 페이지로 이동하시겠습니까?',
    );
    if (!confirmed) return;

    const stored = localStorage.getItem('learnedLectures');

    let list: number[] = [];

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        list = Array.isArray(parsed)
          ? parsed.map((v) => Number(v)).filter((v) => !Number.isNaN(v))
          : [];
      } catch (err) {
        console.error('localStorage 파싱 실패:', err);
      }
    }

    if (!list.includes(lectureId)) {
      list.push(lectureId);
      localStorage.setItem('learnedLectures', JSON.stringify(list));
    }

    setIsLearning(true);
    router.push('/mylearning');
  };

  const handleContinue = () => {
    router.push('/learning');
  };

  return (
    <Button
      className="w-full h-12 text-lg font-bold bg-white text-zinc-950 hover:bg-zinc-200 cursor-pointer"
      onClick={isLearning ? handleContinue : handleApply}
    >
      {isLearning ? '이어 학습하기' : '수강 신청하기'}
    </Button>
  );
}
