'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { enrollLectureAction } from '@/features/learning/actions';
import { useUserStore } from '@/store/userStore';
import { toast } from 'sonner';
import { useConfirm } from '@/hooks/useConfirm';
import { Payment } from '../../types';

interface Props {
  lectureId: number;
  lectureTitle: string;
  paymentType: Payment;
}

export default function ButtonApply({
  lectureId,
  lectureTitle,
  paymentType,
}: Props) {
  const { user } = useUserStore();
  const router = useRouter();
  const confirm = useConfirm();

  const [isPending, startTransition] = useTransition();

  const checkAvailable = async () => {
    if (!user) {
      const ok = await confirm(
        '로그인 후 이용할 수 있는 서비스입니다.',
        '로그인 페이지로 이동하시겠습니까?',
      );
      if (ok) {
        router.push('/login');
      }
      return false;
    }
    if (paymentType === 'PAID' && !user.isMembershipActive) {
      const ok = await confirm(
        '멤버십 가입 후 수강할 수 있는 강의입니다.',
        '멤버십 관리 페이지로 이동하시겠습니까?',
      );
      if (ok) {
        router.push('/mypage/membership');
      }
      return false;
    }
    return true;
  };

  const handleApply = async () => {
    if (!(await checkAvailable())) return;

    const ok = await confirm(`${lectureTitle}강의를 수강 신청하시겠습니까?`);
    if (!ok) return;

    startTransition(async () => {
      const state = await enrollLectureAction(lectureId);

      if (state.success) {
        const ok = await confirm(
          '수강 신청이 완료되었습니다. 내 학습 페이지로 이동하시겠습니까?',
        );
        if (!ok) return;

        router.push('/mylearning');
      } else {
        switch (state.code) {
          case 'ENROLLMENT_ALREADY_EXISTS': {
            const ok = await confirm(
              `${state.message} 내 학습 페이지로 이동하시겠습니까?`,
            );
            if (ok) {
              router.push('/mylearning');
            }
            break;
          }
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
