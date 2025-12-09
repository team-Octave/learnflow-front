'use client';
import { Button } from '@/components/ui/button';

interface CategoryProps {
  id: string;
  name: string;
  value: string;
  selected: boolean;
  onClick: () => void;
}

export default function Category({ name, selected, onClick }: CategoryProps) {
  return (
    <Button
      variant={selected ? 'default' : 'secondary'}
      className="px-4 py-2 text-sm cursor-pointer transition-opacity hover:opacity-80"
      onClick={onClick}
    >
      {name}
    </Button>
  );
}
