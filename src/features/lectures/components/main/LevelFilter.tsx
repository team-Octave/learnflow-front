//LevelFilter.tsx
'use client';

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
      <select
        className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        value={selectedLevel}
        onChange={(e) => setSelectedLevel(e.target.value)}
      >
        <option value="all">모든 난이도</option>
        <option value="beginner">입문</option>
        <option value="intermediate">중급</option>
        <option value="advanced">고급</option>
      </select>

      {/* 정렬 필터 */}
      <select
        className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        value={selectedSort}
        onChange={(e) => setSelectedSort(e.target.value)}
      >
        <option value="popular">인기 순</option>
        <option value="newest">최신 순</option>
        <option value="rating">별점 높은 순</option>
      </select>
    </div>
  );
}
