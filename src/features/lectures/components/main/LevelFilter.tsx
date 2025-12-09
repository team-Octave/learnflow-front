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

  const options = [
    { value: 'ALL', label: '난이도' },
    { value: 'BEGINNER', label: '초급' },
    { value: 'INTERMEDIATE', label: '중급' },
    { value: 'ADVANCED', label: '고급' },
  ];

  const handleSelect = (value: string) => {
    router.push(`${pathname}?category=${category}&level=${value}&sort=${sort}&page=1`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-10 w-36 rounded-md border border-input bg-background px-3 py-2 text-sm flex items-center justify-between">
        <span>{options.find((o) => o.value === selectedLevel)?.label}</span>
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40 bg-background border border-border rounded-md shadow-md p-1">
        <DropdownMenuRadioGroup value={selectedLevel} onValueChange={handleSelect} className="flex flex-col">
          {options.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value} className="px-3 py-2 rounded-md cursor-pointer hover:bg-primary/10">
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
