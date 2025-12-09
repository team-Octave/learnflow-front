// src/features/lectures/components/main/Sort.tsx
'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';

interface SortProps {
  selectedSort: string; // 선택된 정렬 옵션 (popular, newest, rating)
  setSelectedSort: (value: string) => void; //setSelectedSort: 선택 변경 시 상태를 바꾸는 함수 (React.Dispatch)
}

// props로 현재 선택값과 setter를 받아옴
export default function Sort({ selectedSort, setSelectedSort }: SortProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-10 w-36 rounded-md border border-input bg-background px-3 py-2 text-sm flex items-center justify-between">
        {selectedSort === 'popular'
          ? '인기 순'
          : selectedSort === 'newest'
          ? '최신 순'
          : '별점 높은 순'}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40">
        <DropdownMenuRadioGroup
          value={selectedSort} //value: 현재 선택값
          onValueChange={setSelectedSort} //onValueChange: 선택 변경 시 상태 업데이트 (setSelectedSort)
        >
          <DropdownMenuRadioItem value="popular">인기 순</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="newest">최신 순</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="rating">
            별점 높은 순
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
