'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

interface LevelFilterProps {
  selectedLevel: string;
  setSelectedLevel: (value: string) => void;
}

export default function LevelFilter({
  selectedLevel,
  setSelectedLevel,
}: LevelFilterProps) {
  const options = [
    { value: 'all', label: '난이도' },
    { value: 'beginner', label: '입문' },
    { value: 'intermediate', label: '중급' },
    { value: 'advanced', label: '고급' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-10 w-36 rounded-md border border-input bg-background px-3 py-2 text-sm flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
        <span>{options.find((o) => o.value === selectedLevel)?.label}</span>
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40 bg-background border border-border rounded-md shadow-md p-1">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            className="px-3 py-2 rounded-md cursor-pointer hover:bg-primary/10 focus:bg-primary/20"
            onClick={() => setSelectedLevel(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
