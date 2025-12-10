import { Button } from '@/components/ui/button';
import LectureForm from '@/features/creator/components/form/LectureForm';
import StepInfo from '@/features/creator/components/form/StepInfo';
import Link from 'next/link';

export default function LectureNewPage() {
  return (
    <div className="flex flex-col mx-auto my-12 gap-8 w-[60%]">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold text-white">새 강의 등록</div>
        {/* form id 지정 후 서버액션으로 할 것 */}
        <Button className="bg-white hover:bg-white/90 cursor-pointer" form="">
          저장하고 다음
        </Button>
      </div>
      <StepInfo step={1} />
      <LectureForm />
    </div>
  );
}
