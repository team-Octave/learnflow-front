'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LevelFilterProps {
  selectedLevel: string;
  setSelectedLevel: (value: string) => void;
  selectedSort: string;
  setSelectedSort: (value: string) => void;
}

export default function LevelFilter({
  selectedLevel,
  setSelectedLevel,
  selectedSort,
  setSelectedSort,
}: LevelFilterProps) {
  return (
    <div className="flex items-center gap-3 w-full md:w-auto">
      {/* 난이도 필터 */}
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
            <DropdownMenuRadioItem value="all">
              모든 난이도
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="beginner">입문</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="intermediate">
              중급
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="advanced">고급</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 정렬 필터 */}
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
            value={selectedSort}
            onValueChange={setSelectedSort}
          >
            <DropdownMenuRadioItem value="popular">
              인기 순
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="newest">
              최신 순
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="rating">
              별점 높은 순
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
