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

export default function LevelFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const level = searchParams.get('level') || 'ALL';

  const update = (value: string) => {
    const query = new URLSearchParams(searchParams.toString());
    query.set('level', value);
    query.delete('page');
    router.push(`?${query.toString()}`, { scroll: false });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-10 w-36 border rounded-md px-3 py-2 text-sm flex items-center justify-between">
        {level === 'ALL'
          ? '난이도'
          : level === 'BEGINNER'
          ? '입문'
          : level === 'INTERMEDIATE'
          ? '중급'
          : '고급'}
        <ChevronDown />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={level} onValueChange={update}>
          <DropdownMenuRadioItem value="ALL">전체</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="BEGINNER">입문</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="INTERMEDIATE">
            중급
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="ADVANCED">고급</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
