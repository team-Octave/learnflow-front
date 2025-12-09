'use client';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

interface SortProps {
  selectedSort: string;
  category: string;
  level: string;
}

export default function Sort({ selectedSort, category, level }: SortProps) {
  const options = [
    { value: 'POPULAR', label: '인기 순' },
    { value: 'NEWEST', label: '최신 순' },
    { value: 'RATING', label: '별점 높은 순' },
  ];

  const handleSelect = (value: string) => {
    const params = new URLSearchParams({
      category,
      level,
      sort: value,
      page: '1',
    });
    window.location.href = `/?${params.toString()}`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-10 w-36 rounded-md border border-input bg-background px-3 py-2 text-sm flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
        <span>{options.find((o) => o.value === selectedSort)?.label}</span>
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40 bg-background border border-border rounded-md shadow-md p-1">
        <DropdownMenuRadioGroup
          value={selectedSort}
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
