import { AspectRatio } from '@/components/ui/aspect-ratio';
import ProgressBar from './ProgressBar';
import ReviewButton from './ReviewButton';
import Link from 'next/link';
import { LearningLecture } from '../../types';
import { Play } from 'lucide-react';

interface MyLectureCardProps {
  lecture: LearningLecture;
  isBlocked: boolean;
}

export default function MyLectureCard({
  lecture,
  isBlocked,
}: MyLectureCardProps) {
  const lessonId =
    lecture.completedLessonIds.length === 0
      ? lecture.firstLessonId
      : lecture.completedLessonIds.slice(-1)[0];

  const href = isBlocked
    ? '/mypage/membership'
    : `/play/${lecture.enrollmentId}/${lecture.lectureId}?lessonId=${lessonId}`;

  return (
    <div className="flex flex-col w-full">
      <Link href={href} className="flex flex-col cursor-pointer">
        <AspectRatio
          ratio={16 / 9}
          className="bg-muted rounded-lg hover:-translate-y-1 transition-all group relative overflow-hidden"
        >
          <img
            src={lecture.lectureThumbnail}
            alt="강의 썸네일"
            className="h-full w-full rounded-lg object-cover transition-all duration-300 group-hover:brightness-95 group-hover:grayscale-[0.3]"
          />
          {isBlocked && (
            <div className="absolute bg-zinc-950/70 inset-0 flex flex-col items-center justify-center gap-1 text-xs">
              <span>멤버십이 만료되었습니다.</span>
              <span>수강하시려면 멤버십 가입이 필요합니다.</span>
            </div>
          )}
          {!isBlocked && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-black/30 rounded-full p-3">
                <Play className="w-8 h-8 text-white fill-white" />
              </div>
            </div>
          )}
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
