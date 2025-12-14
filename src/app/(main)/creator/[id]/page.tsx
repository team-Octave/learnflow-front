import { Button } from '@/components/ui/button';
import CurriculumForm from '@/features/creator/components/form/CurriculumForm';
import LectureForm from '@/features/creator/components/form/LectureForm';
import StepInfo from '@/features/creator/components/form/StepInfo';
import { CreatorLecture } from '@/features/creator/types';
import { getLectureByIdAction } from '@/features/lectures/actions';
import { getParam } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface LectureEditPageProps {
  params: Promise<{ id: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function LectureEditPage({
  params,
  searchParams,
}: LectureEditPageProps) {
  const { id } = await params;
  const stepString = getParam((await searchParams).step) || '1';
  const step = parseInt(stepString);

  const response = await getLectureByIdAction(parseInt(id));
  if (!response.success) {
    console.log(response.error);
    return <div>{response.error}</div>;
  }

  const lecture = response.data!;

  return (
    <div className="flex flex-col mx-auto my-12 gap-8 w-[80%] md:w-[60%] ">
      <div className="flex justify-between items-center">
        {step === 1 ? (
          <>
            <div className="flex gap-2 items-center">
              <Link href={'/creator'} replace>
                <ChevronLeft />
              </Link>
              <div className="text-2xl font-bold text-white">강의 수정</div>
            </div>
            {/* form id 지정 후 서버액션으로 할 것 */}
            <Button
              className="bg-white hover:bg-white/90 cursor-pointer"
              form=""
            >
              저장하고 다음
            </Button>
          </>
        ) : (
          <>
            <div className="flex gap-2 items-center">
              <Link href={'/creator'} replace>
                <ChevronLeft />
              </Link>
              <div className="text-2xl font-bold text-white">커리큘럼</div>
            </div>{' '}
            <div className="flex gap-2">
              <Button
                className="bg-white hover:bg-white/90 cursor-pointer"
                form="curriculum-form"
              >
                저장하기
              </Button>
            </div>
          </>
        )}
      </div>
      <StepInfo step={step} />
      {step === 1 ? (
        <LectureForm lecture={lecture} />
      ) : (
        <CurriculumForm lecture={lecture} />
      )}
    </div>
  );
}
