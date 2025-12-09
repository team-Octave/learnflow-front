// src/features/lectures/components/main/MainPagination.tsx

'use client';
import * as React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

interface MainPaginationProps {
  currentPage: number;
  totalPages: number;
  category: string;
  level: string;
  sort: string;
  maxVisiblePages?: number;
}

export default function MainPagination({
  currentPage,
  totalPages,
  category,
  level,
  sort,
  maxVisiblePages = 5,
}: MainPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();

  // 페이지 번호 계산
  const generatePageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(currentPage - half, 1);
    let end = Math.min(start + maxVisiblePages - 1, totalPages);

    if (end - start < maxVisiblePages - 1)
      start = Math.max(end - maxVisiblePages + 1, 1);

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('ellipsis');
    }

    for (let i = start; i <= end; i++) pages.push(i);

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('ellipsis');
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  // SPA 클릭 시 router.push()로 URL 업데이트
  const goToPage = (page: number) => {
    const params = new URLSearchParams({
      category,
      level,
      sort,
      page: page.toString(),
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination className="flex justify-center items-center gap-2 mt-6">
      <PaginationPrevious
        onClick={() => goToPage(Math.max(currentPage - 1, 1))}
        className="border rounded w-9 h-9 flex items-center justify-center hover:bg-zinc-800 transition-colors"
        aria-disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4" />
      </PaginationPrevious>

      <PaginationContent className="flex gap-1">
        {pageNumbers.map((page, idx) =>
          page === 'ellipsis' ? (
            <PaginationEllipsis
              key={idx}
              className="w-9 h-9 flex items-center justify-center text-muted-foreground"
            >
              <MoreHorizontal className="w-4 h-4" />
            </PaginationEllipsis>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => goToPage(page as number)}
                className={`w-9 h-9 flex items-center justify-center border rounded transition-colors ${
                  page === currentPage
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-background text-foreground border-border hover:bg-zinc-800'
                }`}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
      </PaginationContent>

      <PaginationNext
        onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
        className="border rounded w-9 h-9 flex items-center justify-center hover:bg-zinc-800 transition-colors"
        aria-disabled={currentPage === totalPages}
      >
        <ChevronRight className="w-4 h-4" />
      </PaginationNext>
    </Pagination>
  );
}
