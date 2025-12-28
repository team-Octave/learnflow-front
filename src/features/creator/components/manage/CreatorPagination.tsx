'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  currentPage: number;
  totalPages: number;
}

export default function CreatorPagination({ currentPage, totalPages }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const prevPage = currentPage > 1 ? currentPage - 1 : 1;
  const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  const handleClick = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Pagination className="flex justify-center items-center gap-2 mt-12">
      <PaginationContent className="flex items-center gap-2">
        {/* PREVIOUS */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              if (!isPrevDisabled) handleClick(prevPage);
            }}
            aria-disabled={isPrevDisabled}
            tabIndex={isPrevDisabled ? -1 : 0}
            className={`
              w-9 h-9 flex items-center justify-center rounded border
              border-zinc-800 
              [&>span]:hidden [&>svg]:block
              cursor-pointer

              ${
                isPrevDisabled
                  ? 'opacity-40 pointer-events-none'
                  : 'hover:bg-zinc-800 hover:text-white'
              }
            `}
          />
        </PaginationItem>

        {/* PAGE NUMBERS */}
        {pages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              onClick={() => {
                if (p !== currentPage) handleClick(p);
              }}
              isActive={p === currentPage}
              aria-disabled={p === currentPage}
              className="
                w-9 h-9 flex items-center justify-center rounded border text-sm

                data-[active=true]:bg-zinc-500
                data-[active=true]:text-zinc-500
                data-[active=true]:border-bg-zinc-600
                cursor-pointer

                border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white
              "
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* NEXT */}
        <PaginationItem>
          <PaginationNext
            onClick={() => {
              if (!isNextDisabled) handleClick(nextPage);
            }}
            aria-disabled={isNextDisabled}
            tabIndex={isNextDisabled ? -1 : 0}
            className={`
              w-9 h-9 flex items-center justify-center rounded border
              border-zinc-800 
              [&>span]:hidden [&>svg]:block
              cursor-pointer
              ${
                isNextDisabled
                  ? 'opacity-40 pointer-events-none'
                  : 'hover:bg-zinc-800 hover:text-white'
              }
            `}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
