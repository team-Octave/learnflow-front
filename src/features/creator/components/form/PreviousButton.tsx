'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'; // 사용 중인 버튼 컴포넌트 경로

interface PreviousButtonProps {
  lectureId: number;
}

export default function PreviousButton({ lectureId }: PreviousButtonProps) {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      type="button"
      onClick={() => router.push(`/creator/${lectureId}?step=1`)}
      className="cursor-pointer border-white text-white hover:bg-white/10"
    >
      이전
    </Button>
  );
}
