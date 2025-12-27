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
      // 구조 변경:
      // success, error, data에서 success, code, message(error), data로 구조 변경됨
      const state = await enrollLectureAction(parseInt(lectureId));
      // 성공한 경우
      if (state.success) {
        const confirmed = confirm(
          '수강 신청이 완료되었습니다. 내 학습 페이지로 이동하시겠습니까?',
        );
        if (!confirmed) return;

        router.push('/mylearning'); // 내 학습 페이지로 이동
      } else {
        // 실패한 경우
        switch (state.code) {
          // 이미 수강 중인 강좌의 경우
          case 'ENROLLMENT_ALREADY_EXISTS': {
            if (
              confirm(`${state.message} 내 학습 페이지로 이동하시겠습니까?`)
            ) {
              router.push('/mylearning');
            }
            break;
          }
          // 자신이 등록한 강의에 수강신청 하는 경우(우선 분리함)
          case 'SELF_ENROLLMENT_NOT_ALLOWED': {
            alert(state.message);
            break;
          }
          // 이 외의 상황이면 메시지 alert 후 리턴
          default: {
            alert(state.message);
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
    >
      수강 신청하기
    </Button>
  );
}
