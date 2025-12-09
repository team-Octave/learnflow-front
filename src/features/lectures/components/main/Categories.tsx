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

// 구조분해로 props 받는 부분. 부모에서 내려준 props 3개를 받음.
export default function Categories({
  categories,
  selected,
  onSelect,
}: CategoriesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {/* 전달받은 categories 배열을 순회. */}
      {categories.map((item) => (
        <Category
          key={item.id}
          id={item.id}
          name={item.name}
          value={item.value}
          selected={selected === item.value} //현재 선택된 카테고리인지 boolean으로 판단
          onSelect={onSelect} //Category 버튼 클릭 시 value를 부모로 다시 전달하게 됨
        />
      ))}
    </div>
  );
}
