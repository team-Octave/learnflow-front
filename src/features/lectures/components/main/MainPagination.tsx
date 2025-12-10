'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';
import { usePathname } from 'next/navigation';

interface Props {
  currentPage: number;
  totalPages: number;
  category: string;
  level: string;
  sort: string;
}

export default function MainPagination({
  currentPage,
  totalPages,
  category,
  level,
  sort,
}: Props) {
  const pathname = usePathname();

  const makeHref = (page: number) =>
    `${pathname}?category=${category}&level=${level}&sort=${sort}&page=${page}`;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const prevPage = currentPage > 1 ? currentPage - 1 : 1;
  const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <Pagination className="flex justify-center items-center gap-2 mt-12">
      <PaginationContent className="flex items-center gap-2">
        {/* PREVIOUS */}
        <PaginationItem>
          <PaginationPrevious
            href={isPrevDisabled ? '#' : makeHref(prevPage)}
            aria-disabled={isPrevDisabled}
            tabIndex={isPrevDisabled ? -1 : 0}
            className={`
              w-9 h-9 flex items-center justify-center rounded border
              border-zinc-800 
              [&>span]:hidden [&>svg]:block

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
              href={makeHref(p)}
              isActive={p === currentPage}
              className="
                w-9 h-9 flex items-center justify-center rounded border text-sm

                data-[active=true]:bg-primary
                data-[active=true]:text-primary-foreground
                data-[active=true]:border-primary

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
            href={isNextDisabled ? '#' : makeHref(nextPage)}
            aria-disabled={isNextDisabled}
            tabIndex={isNextDisabled ? -1 : 0}
            className={`
              w-9 h-9 flex items-center justify-center rounded border
              border-zinc-800 
              [&>span]:hidden [&>svg]:block

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
