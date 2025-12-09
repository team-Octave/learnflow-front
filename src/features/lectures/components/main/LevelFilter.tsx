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

interface LevelFilterProps {
  selectedLevel: string;
  category: string; // 현재 선택된 카테고리 (쿼리 유지용)
  sort: string; // 현재 선택된 정렬 (쿼리 유지용)
}

export default function LevelFilter({
  selectedLevel,
  category,
  sort,
}: LevelFilterProps) {
  const options = [
    { value: 'ALL', label: '난이도' },
    { value: 'BEGINNER', label: '초급' },
    { value: 'INTERMEDIATE', label: '중급' },
    { value: 'ADVANCED', label: '고급' },
  ];

  const handleSelect = (value: string) => {
    const params = new URLSearchParams({
      category,
      level: value,
      sort,
      page: '1', // 필터 변경 시 항상 1페이지로
    });
    window.location.href = `/lectures?${params.toString()}`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-10 w-36 rounded-md border border-input bg-background px-3 py-2 text-sm flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
        <span>{options.find((o) => o.value === selectedLevel)?.label}</span>
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40 bg-background border border-border rounded-md shadow-md p-1">
        <DropdownMenuRadioGroup
          value={selectedLevel}
          onValueChange={handleSelect}
          className="flex flex-col"
        >
          {options.map((option) => (
            <DropdownMenuRadioItem
              key={option.value}
              value={option.value}
              className="px-3 py-2 rounded-md cursor-pointer hover:bg-primary/10 focus:bg-primary/20 [&>span]:hidden"
            >
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
