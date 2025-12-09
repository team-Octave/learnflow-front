'use client';
import Category from './Category';
import { useRouter, usePathname } from 'next/navigation';

interface CategoriesProps {
  categories: { id: string; name: string; value: string }[];
  selectedCategory: string;
  selectedLevel: string;
  selectedSort: string;
}

export default function Categories({
  categories,
  selectedCategory,
  selectedLevel,
  selectedSort,
}: CategoriesProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (category: string) => {
    router.push(
      `${pathname}?category=${category}&level=${selectedLevel}&sort=${selectedSort}&page=1`
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((item) => (
        <Category
          key={item.id}
          id={item.id}
          name={item.name}
          value={item.value}
          selected={selectedCategory === item.value}
          onClick={() => handleClick(item.value)}
        />
      ))}
    </div>
  );
}
