'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { enrollLectureAction } from '@/features/learning/actions';

interface Props {
  lectureId: string;
  lectureTitle: string;
}

export default function ButtonApply({ lectureId, lectureTitle }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleApply = () => {
    if (!confirm(`${lectureTitle}강의를 수강 신청하시겠습니까?`)) return;

    startTransition(async () => {
      const response = await enrollLectureAction(parseInt(lectureId));
      if (!response.success) {
        alert(response.error);
        return;
      } else {
        const confirmed = confirm(
          '수강 신청이 완료되었습니다. 내 학습 페이지로 이동하시겠습니까?',
        );
        if (!confirmed) return;

        router.push('/mylearning'); // 내 학습 페이지로 이동
      }
    });
  };

  return (
    <Button
      className="w-full h-12 text-lg font-bold bg-white text-zinc-950 hover:bg-zinc-200 cursor-pointer"
      onClick={handleApply}
      disabled={isPending}
    >
      수강 신청하기
    </Button>
  );
}
