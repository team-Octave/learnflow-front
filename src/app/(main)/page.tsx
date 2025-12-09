// src/app/(main)/page.tsx
import MainVisual from '@/features/lectures/components/main/MainVisual';
import Categories from '@/features/lectures/components/main/Categories';
import LevelFilter from '@/features/lectures/components/main/LevelFilter';
import Sort from '@/features/lectures/components/main/Sort';
import LectureCard from '@/features/lectures/components/main/LectureCard';
import MainPagination from '@/features/lectures/components/main/MainPagination';
import { categories } from '@/lib/mock-data';
import { getLecturesByQuery } from '@/services/lectures.service';

interface PageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

// 기본 값 상수
const DEFAULT_CATEGORY = 'ALL';
const DEFAULT_LEVEL = 'ALL';
const DEFAULT_SORT = 'POPULAR';
const ITEMS_PER_PAGE = 16;

// 공통: 쿼리 스트링에서 첫 번째 값만 뽑고, 없으면 기본값 사용 + 대문자 변환
function normalizeQueryParam(
  raw: string | string[] | undefined,
  defaultValue: string,
) {
  if (!raw) return defaultValue;
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (!value) return defaultValue;
  return value.toUpperCase();
}

// page 전용: 숫자 파싱 + 최소 1 보장
function parsePageParam(raw: string | string[] | undefined): number {
  const value = Array.isArray(raw) ? raw[0] : raw;
  const num = parseInt(value || '1', 10);
  if (Number.isNaN(num) || num < 1) return 1;
  return num;
}

// 서버 컴포넌트
export default async function MainPage({ searchParams }: PageProps) {
  const params = searchParams ?? {};

  // 쿼리스트링이 없으면 기본값, 있으면 그 값을 사용 (대문자로 통일)
  const categoryParam = normalizeQueryParam(params.category, DEFAULT_CATEGORY);
  const levelParam = normalizeQueryParam(params.level, DEFAULT_LEVEL);
  const sortParam = normalizeQueryParam(params.sort, DEFAULT_SORT);
  const pageParam = parsePageParam(params.page);

  // API 요청: 카테고리 / 난이도 / 정렬 / 페이지네이션 정보 전달
  const lectures = await getLecturesByQuery({
    category: categoryParam, // 'ALL' | 'DEVELOPMENT' 같은 형태
    level: levelParam,       // 'ALL' | 'BEGINNER' 등
    sort: sortParam,         // 'POPULAR' 등
    page: pageParam,         // 현재 페이지
    limit: ITEMS_PER_PAGE,   // 한 페이지 강의 개수
  });

  const totalPages = Math.max(
    1,
    Math.ceil(lectures.totalCount / ITEMS_PER_PAGE),
  );

  return (
    <div className="flex flex-col min-h-screen w-full">
      <MainVisual />

      <div className="py-12 md:py-20 bg-background flex justify-center">
        <div className="container px-4 md:px-8">
          {/* 상단 필터 - 모두 client component */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <Categories
              categories={categories}
              selectedCategory={categoryParam}
              selectedLevel={levelParam}
              selectedSort={sortParam}
            />

            <div className="flex items-center gap-4">
              <LevelFilter
                selectedLevel={levelParam}
                category={categoryParam}
                sort={sortParam}
              />
              <Sort
                selectedSort={sortParam}
                category={categoryParam}
                level={levelParam}
              />
            </div>
          </div>

          {/* 강의 리스트 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {lectures.items.map((lecture) => (
              <LectureCard key={lecture.id} lecture={lecture} />
            ))}
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="mt-12">
              <MainPagination
                currentPage={pageParam}
                totalPages={totalPages}
                category={categoryParam}
                level={levelParam}
                sort={sortParam}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
