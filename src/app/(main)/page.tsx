// learnflow-front/src/app/(main)/page.tsx
import MainVisual from '@/features/lectures/components/main/MainVisual';
import Categories from '@/features/lectures/components/main/Categories';
import LevelFilter from '@/features/lectures/components/main/LevelFilter';
import Sort from '@/features/lectures/components/main/Sort';
import LectureCard from '@/features/lectures/components/main/LectureCard';
import MainPagination from '@/features/lectures/components/main/MainPagination';
import { categories } from '@/lib/mock-data';
import { getLecturesByQuery } from '@/services/lectures.service';

interface PageProps {
  searchParams?: {
    category?: string;
    level?: string;
    sort?: string;
    page?: string;
  };
}

export default async function MainPage({ searchParams }: PageProps) {
  // 쿼리스트링에서 값 가져오기, 없으면 기본값
  const selectedCategory = searchParams?.category || 'ALL';
  const selectedLevel = searchParams?.level || 'all';
  const selectedSort = searchParams?.sort || 'popular';
  const currentPage = parseInt(searchParams?.page || '1', 10);
  const ITEMS_PER_PAGE = 16;

  // API 호출 (mock-data든 실제 API든)
  const lectures = await getLecturesByQuery({
    category: selectedCategory,
    level: selectedLevel,
    sort: selectedSort,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  const totalPages = Math.ceil(lectures.totalCount / ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Main Visual */}
      <MainVisual />

      <div className="py-12 md:py-20 bg-background flex justify-center">
        <div className="container px-4 md:px-8">
          {/* 상단 필터들 */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <Categories
              categories={categories}
              selected={selectedCategory}
              onSelect={(value) => {
                const params = new URLSearchParams({
                  category: value,
                  level: selectedLevel,
                  sort: selectedSort,
                  page: '1',
                });
                window.location.href = `/lectures?${params.toString()}`;
              }}
            />

            <div className="flex items-center gap-4">
              <LevelFilter
                selectedLevel={selectedLevel}
                setSelectedLevel={(value) => {
                  const params = new URLSearchParams({
                    category: selectedCategory,
                    level: value,
                    sort: selectedSort,
                    page: '1',
                  });
                  window.location.href = `/lectures?${params.toString()}`;
                }}
              />
              <Sort
                selectedSort={selectedSort}
                setSelectedSort={(value) => {
                  const params = new URLSearchParams({
                    category: selectedCategory,
                    level: selectedLevel,
                    sort: value,
                    page: '1',
                  });
                  window.location.href = `/lectures?${params.toString()}`;
                }}
              />
            </div>
          </div>

          {/* 강의 카드 리스트 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {lectures.items.map((lecture: any) => (
              <LectureCard key={lecture.id} lecture={lecture} />
            ))}
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="mt-12">
              <MainPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  const params = new URLSearchParams({
                    category: selectedCategory,
                    level: selectedLevel,
                    sort: selectedSort,
                    page: page.toString(),
                  });
                  window.location.href = `/lectures?${params.toString()}`;
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
