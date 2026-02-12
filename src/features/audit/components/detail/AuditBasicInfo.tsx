import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import type { ApprovalDetail } from '@/features/audit/types';
import { CATEGORY_MAP } from '@/features/lectures/types';
import Image from 'next/image';

// 강의 검토 상세페이지 -강의 기본 정보 (썸네일 부분)
interface AuditBasicInfoProps {
  audit: ApprovalDetail;
}

export default function AuditBasicInfo({ audit }: AuditBasicInfoProps) {
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
            className="bg-zinc-100 dark:bg-zinc-800 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 overflow-hidden rounded-sm"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Image
              src={audit.thumbnailUrl || '/images/placeholder.jpg'}
              alt={audit.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
              priority
            />
          </AspectRatio>
        </div>

        <div className="flex flex-col justify-center flex-1 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant={'default'}>{CATEGORY_MAP[audit.categoryId]}</Badge>

            <Badge
              variant={audit.level as 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'}
            >
              {levelText}
            </Badge>

            {audit.paymentType === 'PAID' ? (
              <Badge variant={'membership'}>멤버십</Badge>
            ) : (
              <Badge variant={'free'}>무료</Badge>
            )}
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
              {audit.instructorName ?? '-'}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
