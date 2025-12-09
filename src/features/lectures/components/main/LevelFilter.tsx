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

export default function LevelFilter({ category, level, sort }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const update = (value: string) => {
    const query = new URLSearchParams({
      category,
      level: value,
      sort,
      page: '1',
    });
    router.push(`${pathname}?${query.toString()}`);
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
