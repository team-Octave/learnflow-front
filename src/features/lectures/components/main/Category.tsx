'use client';

import { Button } from '@/components/ui/button';

interface Props {
  name: string;
  value: string;
  selected: boolean;
  onClick: () => void;
}

export default function Category({ name, selected, onClick }: Props) {
  return (
    <Button variant={selected ? 'default' : 'secondary'} onClick={onClick}>
      {name}
    </Button>
  );
}
