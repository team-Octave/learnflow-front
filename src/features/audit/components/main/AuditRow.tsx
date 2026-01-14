// src/features/audit/components/main/AuditRow.tsx
import Image from 'next/image';
import { ImageIcon, Calendar, Clock } from 'lucide-react';

import type { AuditLecture } from '@/features/audit/types';
import { TableCell, TableRow } from '@/components/ui/table';
import AuditButton from './AuditButton';

type Props = {
  lecture: AuditLecture;
};

function formatDateTime(iso: string) {
  const d = new Date(iso);

  const date = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(d);

  const time = new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(d);

  return { date, time };
}

export default function AuditRow({ lecture }: Props) {
  const { date, time } = formatDateTime(lecture.requestedAt);

  return (
    <TableRow className="border-white/10 hover:bg-white/5">
      {/* 썸네일 */}
      <TableCell className="py-4 px-6">
        <div className="h-[62px] rounded-lg overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
          {lecture.thumbnailUrl ? (
            <Image
              src={lecture.thumbnailUrl}
              alt={`${lecture.title} 썸네일`}
              width={220}
              height={124}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-white/30 flex flex-col items-center gap-1">
              <ImageIcon size={18} />
              <span className="text-[10px]">No Image</span>
            </div>
          )}
        </div>
      </TableCell>

      {/* 제목 */}
      <TableCell className="text-white/90 px-6">
        <p className="text-sm font-medium line-clamp-2">{lecture.title}</p>
      </TableCell>

      {/* 닉네임 */}
      <TableCell className="text-white/80 text-sm px-6">
        {lecture.instructorNickname}
      </TableCell>

      {/* 신청일 */}
      <TableCell className="text-white/70 text-sm px-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-white/50" />
            <span className="text-white/70">{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-white/50" />
            <span className="text-white/60">{time}</span>
          </div>
        </div>
      </TableCell>

      {/* 검토 버튼 → 클라이언트 컴포넌트 분리 */}
      <TableCell className="px-6">
        <AuditButton lectureId={lecture.id} />
      </TableCell>
    </TableRow>
  );
}
