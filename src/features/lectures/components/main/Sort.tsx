'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function Sort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort') || 'POPULAR';

  const update = (value: string) => {
    const query = new URLSearchParams(searchParams.toString());
    query.set('sort', value);
    query.delete('page');
    router.push(`?${query.toString()}`, { scroll: false });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-10 w-36 border rounded-md px-3 py-2 text-sm flex items-center justify-between">
        {sort === 'POPULAR'
          ? '인기순'
          : sort === 'NEWEST'
          ? '최신순'
          : '별점순'}
        <ChevronDown />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={sort} onValueChange={update}>
          <DropdownMenuRadioItem value="POPULAR">인기순</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="NEWEST">최신순</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="RATING">별점순</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
