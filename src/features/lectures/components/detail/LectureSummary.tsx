import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import type { Lecture, Level } from '../../types';
import { CATEGORY_MAP } from '../../types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ButtonApply from './ButtonApply';

interface Props {
  lecture: Lecture;
}

export default function LectureSummary({ lecture }: Props) {
  //난이도 텍스트
  const levelText =
    lecture.level === 'BEGINNER'
      ? '입문'
      : lecture.level === 'INTERMEDIATE'
        ? '중급'
        : '고급';

  return (
    <div className="relative border-b border-zinc-800 w-full">
      {/* 🔥 Background Image Layer */}
      <div className="absolute inset-0">
        <img
          src={lecture.thumbnailUrl}
          alt={lecture.title}
          className="w-full h-full object-cover opacity-60"
        />

        <div className="absolute inset-0 bg-linear-to-r from-zinc-950/70 via-zinc-950/50 to-zinc-950/20" />
      </div>

      {/* Content */}
      <div className="w-full relative z-20 px-8 py-12 flex flex-col md:flex-row gap-8 items-end">
        <div className="w-full flex-1 space-y-6">
          {/* Category + Level + Rating */}
          <div className="flex items-center gap-2">
            <Badge variant="default">{CATEGORY_MAP[lecture.categoryId]}</Badge>
            <Badge variant={lecture.level as Level}>{levelText}</Badge>
            {lecture.paymentType === 'PAID' ? (
              <Badge variant={'membership'}>멤버십</Badge>
            ) : (
              <Badge variant={'free'}>무료</Badge>
            )}

            <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium">
              <Star className="w-4 h-4 fill-current" size={16} />
              <span>
                {lecture.ratingAverage
                  ? lecture.ratingAverage.toFixed(1)
                  : '0.0'}
              </span>
              <span className="text-muted-foreground ml-1">
                (
                {lecture.enrollmentCount
                  ? lecture.enrollmentCount.toLocaleString()
                  : 0}
                명 수강)
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {lecture.title}
          </h1>

          {/* Description */}
          <p className="text-lg text-zinc-300 max-w-2xl leading-relaxed">
            {lecture.description}
          </p>

          {/* Creator */}
          <div className="flex items-center gap-4 pt-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src="" alt={lecture.instructorDisplayName[0]} />
              <AvatarFallback className="bg-zinc-700 text-zinc-300 font-bold">
                {lecture.instructorDisplayName[0]}
              </AvatarFallback>
            </Avatar>

            <div>
              <p className="text-sm font-medium text-white">
                {lecture.instructorDisplayName}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="md:absolute right-8 w-full md:w-80 shrink-0">
          <ButtonApply
            lectureId={lecture.id}
            lectureTitle={lecture.title}
            paymentType={lecture.paymentType}
          />
        </div>
      </div>
    </div>
  );
}
