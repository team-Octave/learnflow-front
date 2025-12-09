import LectureAddButton from '@/features/creator/components/manage/LectureAddButton';
import LectureTable from '@/features/creator/components/manage/LectureTable';

export default function CreatorPage() {
  return (
    <div className="flex flex-col mx-auto my-12 gap-8 w-[80%]">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-bold text-white">강의 관리</div>
          <div className="text-zinc-500">
            등록된 강의 현황을 확인하고 관리하세요.
          </div>
        </div>
        <LectureAddButton />
      </div>
      <LectureTable />
    </div>
  );
}
