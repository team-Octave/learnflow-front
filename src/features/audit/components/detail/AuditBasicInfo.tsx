// src/features/audit/components/detail/AuditBasicInfo.tsx

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import type { Lecture } from '@/features/lectures/types';
import { CATEGORY_MAP } from '@/features/lectures/types';

interface AuditBasicInfoProps {
  audit: Lecture;
}

export default function AuditBasicInfo({ audit }: AuditBasicInfoProps) {
  // 난이도 한글 변환 (LectureCard 방식)
  const levelText =
    audit.level === 'BEGINNER'
      ? '초급'
      : audit.level === 'INTERMEDIATE'
      ? '중급'
      : '고급';

  return (
    <Card className="overflow-hidden border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
      <div className="flex flex-col md:flex-row gap-6 md:items-center">
        <div className="w-full md:w-1/3 min-w-[300px]">
          <AspectRatio
            ratio={16 / 9}
            className="bg-zinc-100 dark:bg-zinc-800 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 overflow-hidden rounded-lg"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={audit.thumbnailUrl}
              alt={audit.title}
              className="object-cover w-full h-full"
            />
          </AspectRatio>
        </div>

        <div className="flex flex-col justify-center flex-1 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            {/* 카테고리 */}
            <Badge
              variant="secondary"
              className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-500/20"
            >
              {CATEGORY_MAP[audit.categoryId]}
            </Badge>

            {/* 난이도 (variant로 색상 처리) */}
            <Badge
              variant={audit.level as 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'}
            >
              {levelText}
            </Badge>
          </div>

          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 leading-tight">
            {audit.title}
          </h2>

          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            {audit.description}
          </p>

          <div className="pt-2 text-sm text-zinc-500 flex items-center gap-2">
            <span>닉네임:</span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-200">
              {audit.instructorDisplayName ?? '-'}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
