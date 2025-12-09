// src/features/lectures/components/main/Category.tsx

'use client';

import { Button } from '@/components/ui/button';

// 부모 컴포넌트(Categories.tsx)에서 받을 props 타입 정의.
interface CategoryProps {
  id: string;
  name: string;
  value: string;
  selected: boolean; //이 버튼이 선택된 상태인지 아닌지 전달 받는 값
  onSelect: (value: string) => void; //이 버튼을 클릭했을 때 실행할 함수
  // => void → 이 함수는 아무것도 리턴하지 않는다.
}

export default function Category({
  id,
  name,
  value,
  selected,
  onSelect,
}: CategoryProps) {
  return (
    <Button
      key={id}
      variant={selected ? 'default' : 'secondary'}
      className="px-4 py-2 text-sm cursor-pointer transition-opacity hover:opacity-80"
      onClick={() => onSelect(value)} //value는 예를 들어 FRONTEND' | 'BACKEND' | 'AI' | 'GAME'; 같은 값
    >
      {name}
    </Button>
  );
}
