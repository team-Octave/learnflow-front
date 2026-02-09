'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Star, Users, PlayCircle } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { CATEGORY_MAP, type Lecture } from '@/features/lectures/types';

interface LectureCardProps {
  lecture: Lecture;
}

export default function LectureCard({ lecture }: LectureCardProps) {
  // 난이도를 한글로 변환
  const levelText =
    lecture.level === 'BEGINNER'
      ? '초급'
      : lecture.level === 'INTERMEDIATE'
        ? '중급'
        : '고급';

  return (
    <Link href={`/detail/${lecture.id}`} className="group">
      {/* 카드 컨테이너 */}
      <div className="flex flex-col h-full overflow-hidden border border-border/50 bg-card/50 hover:bg-card hover:border-border transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg rounded-lg">
        {/* 썸네일 영역 */}
        <AspectRatio
          ratio={16 / 9}
          className="relative overflow-hidden bg-muted"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lecture.thumbnailUrl}
            alt={lecture.title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <PlayCircle className="w-12 h-12 text-white opacity-80" />
          </div>
        </AspectRatio>

        {/* 카드 컨텐츠 */}
        <div className="p-4 space-y-2 flex flex-col">
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-500/20"
            >
              {CATEGORY_MAP[lecture.categoryId]}
            </Badge>

            <Badge
              variant={
                lecture.level as 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
              }
            >
              {levelText}
            </Badge>
          </div>

          <h3 className="h-10 font-bold leading-tight line-clamp-2 group-hover:text-indigo-400 transition-colors">
            {lecture.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {lecture.instructorDisplayName}
          </p>
        </div>

        {/* 별점, 수강생수 */}
        <div className="flex justify-between p-4 pt-0 mt-auto">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
              <span>{lecture.ratingAverage.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="w-3 h-3" />
              <span>{lecture.enrollmentCount.toLocaleString()}명</span>
            </div>
          </div>
          {lecture.paymentType === 'PAID' ? (
            <Badge variant={'membership'}>멤버십</Badge>
          ) : (
            <Badge variant={'free'}>무료</Badge>
          )}
        </div>
      </div>
    </Link>
  );
}
