'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { enrollLectureAction } from '@/features/learning/actions';
import { useUserStore } from '@/store/userStore';
import { toast } from 'sonner';
import { useConfirm } from '@/hooks/useConfirm';

interface Props {
  lectureId: number;
  lectureTitle: string;
}

export default function ButtonApply({ lectureId, lectureTitle }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { user } = useUserStore();
  const confirm = useConfirm();

  const handleApply = async () => {
    const ok = await confirm(`${lectureTitle}강의를 수강 신청하시겠습니까?`);
    if (!ok) return;

    startTransition(async () => {
      // 구조 변경:
      // success, error, data에서 success, code, message(error), data로 구조 변경됨
      const state = await enrollLectureAction(lectureId);
      // 성공한 경우
      if (state.success) {
        const ok = await confirm(
          '수강 신청이 완료되었습니다. 내 학습 페이지로 이동하시겠습니까?',
        );
        if (!ok) return;

        router.push('/mylearning'); // 내 학습 페이지로 이동
      } else {
        // 실패한 경우
        switch (state.code) {
          // 이미 수강 중인 강좌의 경우
          case 'ENROLLMENT_ALREADY_EXISTS': {
            const ok = await confirm(
              `${state.message} 내 학습 페이지로 이동하시겠습니까?`,
            );
            if (ok) {
              router.push('/mylearning');
            }
            break;
          }
          // 자신이 등록한 강의에 수강신청 하는 경우(우선 분리함)
          case 'SELF_ENROLLMENT_NOT_ALLOWED': {
            toast.error(state.message);
            break;
          }
          default: {
            toast.error(state.message);
            break;
          }
        }
      }
    });
  };

  return (
    <Button
      className=" w-full h-12 text-lg font-bold bg-white text-zinc-950 hover:bg-zinc-200 cursor-pointer"
      onClick={handleApply}
      disabled={isPending}
      hidden={user?.role === 'ADMIN'}
    >
      수강 신청하기
    </Button>
  );
}
