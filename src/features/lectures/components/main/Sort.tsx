'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

interface Props {
  category: string;
  level: string;
  sort: string;
}

export default function Sort({ category, level, sort }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const update = (value: string) => {
    const params = new URLSearchParams({
      category,
      level,
      sort: value,
      page: '1',
    });
    router.push(`${pathname}?${params.toString()}`);
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
