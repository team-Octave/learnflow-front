// src/features/lectures/components/main/Category.tsx

'use client';

import { Button } from '@/components/ui/button';

interface CategoryProps {
  id: string;
  name: string;
  value: string;
  selected: boolean;
  onSelect: (value: string) => void;
}

export default function Category({ id, name, value, selected, onSelect }: CategoryProps) {
  return (
    <Button
      key={id}
      variant={selected ? 'default' : 'secondary'}
      className="px-4 py-2 text-sm cursor-pointer transition-opacity hover:opacity-80"
      onClick={() => onSelect(value)}
    >
      {name}
    </Button>
  );
}
