// src/features/audit/components/main/AuditTable.tsx
import type { AuditLectureListResponse } from '@/features/audit/types';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import AuditRow from './AuditRow';
import AuditPagination from './AuditPagination';

type Props = {
  lecturesData: AuditLectureListResponse;
  currentPage: number;
};

export default function AuditTable({ lecturesData, currentPage }: Props) {
  const { items, totalItems, totalPages } = lecturesData;

  return (
    <section className="w-full max-w-5xl">
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.35)] overflow-hidden">
        <div className="px-6 pt-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <h2 className="text-white font-semibold">대기 중인 목록</h2>
            <span className="text-xs text-white/80 px-2 py-0.5 rounded-full bg-white/10 border border-white/10">
              {items.length}
            </span>
          </div>
          <p className="mt-1 text-sm text-white/60">
            검토 요청 순서대로 표시됩니다.
          </p>
        </div>

        <div className="px-6 pb-2">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-white/50 w-[140px]">
                  썸네일
                </TableHead>
                <TableHead className="text-white/50">제목</TableHead>
                <TableHead className="text-white/50 w-[160px]">
                  닉네임
                </TableHead>
                <TableHead className="text-white/50 w-[180px]">
                  신청일
                </TableHead>
                <TableHead className="text-white/50 w-[120px] text-left">
                  검토
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {items.map((lecture) => (
                <AuditRow key={lecture.id} lecture={lecture} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
