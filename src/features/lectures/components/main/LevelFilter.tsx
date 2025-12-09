// src/features/lectures/components/main/LevelFilter.tsx
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

interface LevelFilterProps {
  selectedLevel: string;
  category: string;
  sort: string;
}

export default function LevelFilter({
  selectedLevel,
  category,
  sort,
}: LevelFilterProps) {
  const router = useRouter();
  const pathname = usePathname();

  // 🔹 Trigger에 표시할 텍스트(ALL이면 '난이도')
  const labelMap: Record<string, string> = {
    ALL: '난이도',
    BEGINNER: '초급',
    INTERMEDIATE: '중급',
    ADVANCED: '고급',
  };

  // 🔹 Dropdown에는 ALL 넣지 않음 (초급/중급/고급만)
  const levelOptions = [
    { value: 'BEGINNER', label: '초급' },
    { value: 'INTERMEDIATE', label: '중급' },
    { value: 'ADVANCED', label: '고급' },
  ];

  const handleSelect = (value: string) => {
    router.push(
      `${pathname}?category=${category}&level=${value}&sort=${sort}&page=1`,
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-10 w-36 rounded-md border border-input bg-background px-3 py-2 text-sm flex items-center justify-between">
        <span>{labelMap[selectedLevel] ?? '난이도'}</span>
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40 bg-background border border-border rounded-md shadow-md p-1">
        <DropdownMenuRadioGroup
          value={selectedLevel}
          onValueChange={handleSelect}
          className="flex flex-col"
        >
          {levelOptions.map((option) => (
            <DropdownMenuRadioItem
              key={option.value}
              value={option.value}
              className="
                px-3 py-2 rounded-md cursor-pointer hover:bg-primary/10
                pl-3
                [&>span]:hidden
              "
            >
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
