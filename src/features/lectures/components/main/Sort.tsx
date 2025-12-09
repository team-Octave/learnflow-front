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
  setSelectedSort: (value: string) => void;
}

export default function Sort({ selectedSort, setSelectedSort }: SortProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-10 w-36 rounded-md border border-input bg-background px-3 py-2 text-sm flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
        <span>
          {selectedSort === 'popular'
            ? '인기 순'
            : selectedSort === 'newest'
            ? '최신 순'
            : '별점 높은 순'}
        </span>
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40 bg-background border border-border rounded-md shadow-md p-1">
        <DropdownMenuRadioGroup
          value={selectedSort}
          onValueChange={setSelectedSort}
          className="flex flex-col"
        >
          <DropdownMenuRadioItem
            value="popular"
            className="px-3 py-2 rounded-md cursor-pointer hover:bg-primary/10 focus:bg-primary/20 [&>span]:hidden"
          >
            인기 순
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="newest"
            className="px-3 py-2 rounded-md cursor-pointer hover:bg-primary/10 focus:bg-primary/20"
          >
            최신 순
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="rating"
            className="px-3 py-2 rounded-md cursor-pointer hover:bg-primary/10 focus:bg-primary/20"
          >
            별점 높은 순
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
