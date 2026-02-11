'use client';

import { useUserStore } from '@/store/userStore';
import { LearningLecture } from '../../types';
import MyLectureCard from './MyLectureCard';

interface ProcessingProps {
  lectures: LearningLecture[];
} 

export default function Completed({ lectures }: ProcessingProps) {
  const isMembershipActive = useUserStore(
    (state) => state.user?.isMembershipActive,
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-6">
      {lectures.length !== 0 ? (
        lectures.map((lecture) => (
          <MyLectureCard
            lecture={lecture}
            key={lecture.lectureId}
            isBlocked={lecture.paymentType === 'PAID' && !isMembershipActive}
          />
        ))
      ) : (
        <div>완료한 강의가 없습니다.</div>
      )}
    </div>
  );
}
