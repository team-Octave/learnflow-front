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

interface MainPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number; // 한 번에 표시할 페이지 버튼 수
}

export default function MainPagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
}: MainPaginationProps) {
  if (totalPages <= 1) return null;

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

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('ellipsis');
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <Pagination className="mt-6">
      <PaginationPrevious
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
      >
        <ChevronLeft className="w-4 h-4" />
      </PaginationPrevious>

      <PaginationContent>
        {pageNumbers.map((page, idx) =>
          page === 'ellipsis' ? (
            <PaginationEllipsis key={idx}>
              <MoreHorizontal className="w-4 h-4" />
            </PaginationEllipsis>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => onPageChange(page as number)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
      </PaginationContent>

      <PaginationNext
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
      >
        <ChevronRight className="w-4 h-4" />
      </PaginationNext>
    </Pagination>
  );
}
