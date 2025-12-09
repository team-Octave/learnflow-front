// src/features/lectures/components/main/Categories.tsx
'use client';

import Category from './Category';

interface CategoriesProps {
  categories: {
    id: string;
    name: string;
    value: string;
  }[];
  selected: string;
  onSelect: (value: string) => void;
}

export default function Categories({
  categories,
  selected,
  onSelect,
}: CategoriesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((item) => (
        <Category
          key={item.id}
          id={item.id}
          name={item.name}
          value={item.value}
          selected={selected === item.value}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
