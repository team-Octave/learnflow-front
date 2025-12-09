import { Button } from '@/components/ui/button';
import LectureForm from '@/features/creator/components/form/LectureForm';
import StepInfo from '@/features/creator/components/form/StepInfo';
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
  // const lecture = await getLectureById(id) 가져와서 props로 넘겨주기
  const stepString = getParam((await searchParams).step) || '1';
  const step = parseInt(stepString);

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
              <Link href={`/creator/${id}?step=1`}>
                <Button variant="outline" className="cursor-pointer">
                  이전 단계
                </Button>
              </Link>
              {/* form id 지정 후 서버액션으로 할 것 */}
              <Button
                className="bg-white hover:bg-white/90 cursor-pointer"
                form=""
              >
                저장하기
              </Button>
            </div>
          </>
        )}
      </div>
      <StepInfo step={step} />
      <LectureForm />
    </div>
  );
}
