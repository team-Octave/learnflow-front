import { Button } from '@/components/ui/button';
import LectureForm from '@/features/creator/components/form/LectureForm';
import StepInfo from '@/features/creator/components/form/StepInfo';

export default function LectureNewPage() {
  return (
    <div className="flex flex-col mx-auto my-12 gap-8 w-[60%]">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold text-white">새 강의 등록</div>
        <Button
          type="submit"
          form="basic-form"
          className="bg-white hover:bg-white/90 cursor-pointer"
        >
          저장하고 다음
        </Button>
      </div>
      <StepInfo step={1} />
      <LectureForm />
    </div>
  );
}
