import { LearningLecture, LearningSortOptions } from '../../types';
import MyLectureCard from './MyLectureCard';

interface ProcessingProps {
  lectures: LearningLecture[];
}

export default function Processing({ lectures }: ProcessingProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  auto-rows-auto gap-6">
      {lectures.length !== 0 ? (
        lectures.map((lecture) => (
          <MyLectureCard lecture={lecture} key={lecture.lectureId} />
        ))
      ) : (
        <div>수강 중인 강의가 없습니다.</div>
      )}
    </div>
  );
}
