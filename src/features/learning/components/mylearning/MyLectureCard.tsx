import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';
import ProgressBar from './ProgressBar';
import ReviewButton from './ReviewButton';
import Link from 'next/link';
import { LearningLecture } from '../../types';

interface MyLectureCardProps {
  lecture: LearningLecture;
}

export default function MyLectureCard({ lecture }: MyLectureCardProps) {
  return (
    <div className="flex flex-col w-full">
      <Link
        href={`/play/${lecture.enrollmentId}?lectureId=${
          lecture.lectureId
        }&lessonId=${'임시'}`}
        className="flex flex-col cursor-pointer"
      >
        <AspectRatio
          ratio={16 / 9}
          className="bg-muted rounded-lg hover:-translate-y-1 transition-all"
        >
          <img
            src={lecture.lectureThumbnail}
            alt="강의 썸네일"
            className="h-full w-full rounded-lg object-cover "
          />
        </AspectRatio>
        <div className="flex flex-col p-4 gap-4">
          <div className="h-12 overflow-hidden line-clamp-2 text-ellipsis">
            {lecture.lectureTitle}
          </div>
          <ProgressBar progress={lecture.progress} />
        </div>
      </Link>
      <div className="px-4 pb-4">
        <ReviewButton
          lectureId={lecture.lectureId}
          lectureTitle={lecture.lectureTitle}
          star={lecture.reviewRating}
          text={lecture.reviewContent}
          reviewId={lecture.reviewId}
        />
      </div>
    </div>
  );
}
