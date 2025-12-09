// src/features/lectures/components/main/MainPagination.tsx
'use client';

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

    if (end - start < maxVisiblePages - 1) {
      start = Math.max(end - maxVisiblePages + 1, 1);
    }

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

  const goToPage = (page: number) => {
    const params = new URLSearchParams({
      category,
      level,
      sort,
      page: page.toString(),
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <Pagination className="mt-12 flex justify-center">
      <PaginationContent className="flex items-center gap-2">
        {/* Previous (아이콘만 보이도록 텍스트 숨기기) */}
        <PaginationItem>
          <PaginationPrevious
            onClick={
              currentPage > 1 ? () => goToPage(currentPage - 1) : undefined
            }
            className={`
              w-9 h-9 flex items-center justify-center rounded border 
              border-zinc-800 text-zinc-400 
              hover:bg-indigo-600 hover:text-white
              transition-colors
              relative
            `}
          >
            {/* 기본 텍스트 숨기기 */}
            <span className="hidden"></span>
            <ChevronLeft className="w-4 h-4" />
          </PaginationPrevious>
        </PaginationItem>

        {/* 페이지 번호 */}
        {pageNumbers.map((page, index) =>
          page === 'ellipsis' ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis className="w-9 h-9 flex items-center justify-center text-zinc-500" />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => goToPage(page as number)}
                isActive={page === currentPage}
                className={`
                  w-9 h-9 flex items-center justify-center border rounded 
                  text-sm transition-colors
                  ${
                    page === currentPage
                      ? 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700'
                      : 'border-zinc-800 text-zinc-400 hover:bg-indigo-600 hover:text-white'
                  }
                `}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        {/* Next (아이콘만 보이도록 텍스트 숨기기) */}
        <PaginationItem>
          <PaginationNext
            onClick={
              currentPage < totalPages
                ? () => goToPage(currentPage + 1)
                : undefined
            }
            className={`
              w-9 h-9 flex items-center justify-center rounded border 
              border-zinc-800 text-zinc-400
              hover:bg-indigo-600 hover:text-white
              transition-colors
            `}
          >
            {/* 기본 텍스트 숨기기 */}
            <span className="hidden"></span>
            <ChevronRight className="w-4 h-4" />
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
