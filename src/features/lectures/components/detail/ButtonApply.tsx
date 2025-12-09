'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface Props {
  lectureId: string;
}

export default function ButtonApply({ lectureId }: Props) {
  const router = useRouter();

  const [isLearning, setIsLearning] = useState(false);

  // 처음 마운트될 때 localStorage 확인
  useEffect(() => {
    const stored = localStorage.getItem('learnedLectures');
    if (!stored) return;

    try {
      const parsed: string[] = JSON.parse(stored);
      setIsLearning(parsed.includes(lectureId));
    } catch (err) {
      console.error('localStorage 파싱 실패:', err);
    }
  }, [lectureId]);

  // 수강 신청하기
  const handleApply = () => {
    const confirmed = confirm('내 학습에서 확인하시겠습니까?');
    if (!confirmed) return;

    const stored = localStorage.getItem('learnedLectures');
    let list: string[] = [];

    // 기존 수강 목록 불러오기
    if (stored) {
      try {
        list = JSON.parse(stored);
      } catch (err) {
        console.error('localStorage 파싱 실패:', err);
      }
    }

    // 이미 있으면 중복 추가 금지
    if (!list.includes(lectureId)) {
      list.push(lectureId);
      localStorage.setItem('learnedLectures', JSON.stringify(list));
    }

    setIsLearning(true); // 상태 업데이트

    router.push('/learning'); // 내 학습 페이지로 이동
  };

  // 이어 학습하기
  const handleContinue = () => {
    router.push('/learning');
  };

  return (
    <Button
      className="w-full h-12 text-lg font-bold bg-white text-zinc-950 hover:bg-zinc-200"
      onClick={isLearning ? handleContinue : handleApply}
    >
      {isLearning ? '이어 학습하기' : '수강 신청하기'}
    </Button>
  );
}
