// src/features/lectures/components/main/LevelFilter.tsx
'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LevelFilterProps {
  selectedLevel: string; //현재 선택된 난이도
  setSelectedLevel: (value: string) => void; //선택 변경 시 상태를 업데이트하는 함수 (부모에서 내려받음)
}

// LevelFilter 컴포넌트 정의.
export default function LevelFilter({
  // Props로 selectedLevel과 setSelectedLevel을 받음.
  selectedLevel,
  setSelectedLevel,
}: LevelFilterProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-10 w-36 rounded-md border border-input bg-background px-3 py-2 text-sm flex items-center justify-between">
        {selectedLevel === 'all'
          ? '모든 난이도'
          : selectedLevel === 'beginner'
          ? '입문'
          : selectedLevel === 'intermediate'
          ? '중급'
          : '고급'}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40">
        <DropdownMenuRadioGroup
          value={selectedLevel}
          onValueChange={setSelectedLevel}
        >
          <DropdownMenuRadioItem value="all">모든 난이도</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="beginner">입문</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="intermediate">
            중급
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="advanced">고급</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
