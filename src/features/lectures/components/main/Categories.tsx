// src/features/lectures/components/main/Categories.tsx
'use client';

import { useRouter, usePathname } from 'next/navigation';
import Category from './Category';

interface Props {
  categories: { id: string; name: string; value: string }[];
  category: string;
  level: string;
  sort: string;
}

export default function Categories({ categories, category }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const update = (value: string) => {
    const query = new URLSearchParams();
    query.set('category', value); //  카테고리만 세팅
    router.push(`${pathname}?${query.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((item) => (
        <Category
          key={item.id}
          name={item.name}
          value={item.value}
          selected={category === item.value.toUpperCase()}
          onClick={() => update(item.value.toUpperCase())}
        />
      ))}
    </div>
  );
}
