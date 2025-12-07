import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';
import ProgressBar from './ProgressBar';
import ReviewButton from './ReviewButton';
import Link from 'next/link';

interface MyLectureCardProps {
  lecture: {
    lectureId: string;
    thumbnailURL: string;
    lectureTitle: string;
    progress: number;
    review: {
      star: number;
      text: string;
    };
  };
}

export default function MyLectureCard({ lecture }: MyLectureCardProps) {
  return (
    <div className="flex flex-col w-full">
      <Link
        href={`/play/${lecture.lectureId}`}
        className="flex flex-col cursor-pointer"
      >
        <AspectRatio
          ratio={16 / 9}
          className="bg-muted rounded-lg hover:-translate-y-1 transition-all"
        >
          <img
            src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
            alt="강의 썸네일"
            className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
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
          lectureTitle={lecture.lectureTitle}
          review={lecture.review}
        />
      </div>
    </div>
  );
}
