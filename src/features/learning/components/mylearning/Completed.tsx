import MyLectureCard from './MyLectureCard';

export default function Completed() {
  const dummyLecture = {
    lectureId: '1',
    thumbnailURL: '',
    lectureTitle: '강의 제목란',
    progress: 100,
    review: {
      star: 4,
      text: '수강평',
    },
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-6">
      <MyLectureCard lecture={dummyLecture} />
      <MyLectureCard lecture={dummyLecture} />
      <MyLectureCard lecture={dummyLecture} />
      <MyLectureCard lecture={dummyLecture} />
    </div>
  );
}
