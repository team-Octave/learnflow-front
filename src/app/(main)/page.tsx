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

// 서버 컴포넌트
export default async function MainPage({ searchParams }: PageProps) {
  const params = searchParams || {};

  const categoryParam = Array.isArray(params.category)
    ? params.category[0].toUpperCase()
    : (params.category || 'ALL').toUpperCase();

  const levelParam = Array.isArray(params.level)
    ? params.level[0].toUpperCase()
    : (params.level || 'ALL').toUpperCase();

  const sortParam = Array.isArray(params.sort)
    ? params.sort[0].toUpperCase()
    : (params.sort || 'POPULAR').toUpperCase();

  const pageParam = Array.isArray(params.page)
    ? parseInt(params.page[0], 10)
    : parseInt(params.page || '1', 10);

  const ITEMS_PER_PAGE = 16;

  const lectures = await getLecturesByQuery({
    category: categoryParam,
    level: levelParam,
    sort: sortParam,
    page: pageParam,
    limit: ITEMS_PER_PAGE,
  });

  const totalPages = Math.ceil(lectures.totalCount / ITEMS_PER_PAGE);

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
