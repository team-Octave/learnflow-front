// src/features/lectures/components/main/Categories.tsx
'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Category from './Category';
import { CATEGORIES } from '../../types';

export default function Categories() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'ALL';

  const update = (value: string) => {
    const query = new URLSearchParams(searchParams.toString());
    query.set('category', value); //  카테고리만 세팅
    query.delete('page');
    router.push(`?${query.toString()}`, { scroll: false });
  };

  return (
    <nav className="flex flex-wrap gap-2" aria-label="카테고리">
      {CATEGORIES.map((item: { id: string; name: string; value: string }) => (
        <Category
          key={item.id}
          name={item.name}
          value={item.value}
          selected={category === item.value.toUpperCase()}
          onClick={() => update(item.value.toUpperCase())}
        />
      ))}
    </nav>
  );
}
