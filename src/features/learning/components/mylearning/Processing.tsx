import MyLectureCard from './MyLectureCard';

interface ProcessingProps {
  sortOrder: string;
}

export default function Processing({ sortOrder }: ProcessingProps) {
  const dummyLecture = {
    lectureId: '1',
    thumbnailURL: '',
    lectureTitle: 'Next.js 15 완벽 가이드: 프로덕션 레벨 앱 만들기',
    progress: 40,
    review: {
      star: 4,
      text: '수강평',
    },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  auto-rows-auto gap-6">
      <MyLectureCard lecture={dummyLecture} />
      <MyLectureCard lecture={dummyLecture} />
      <MyLectureCard lecture={dummyLecture} />
      <MyLectureCard lecture={dummyLecture} />
    </div>
  );
}
