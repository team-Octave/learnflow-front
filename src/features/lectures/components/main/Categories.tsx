// src/features/lectures/components/main/Categories.tsx
'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Category from './Category';

interface Props {
  categories: { id: string; name: string; value: string }[];
}

export default function Categories({ categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'ALL';

  const update = (value: string) => {
    const query = new URLSearchParams(searchParams.toString());
    query.set('category', value); //  카테고리만 세팅
    router.push(`?${query.toString()}`, { scroll: false });
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
