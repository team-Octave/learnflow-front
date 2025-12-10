// src/app/(main)/page.tsx
import MainVisual from '@/features/lectures/components/main/MainVisual';
import Categories from '@/features/lectures/components/main/Categories';
import LevelFilter from '@/features/lectures/components/main/LevelFilter';
import Sort from '@/features/lectures/components/main/Sort';
import LectureCard from '@/features/lectures/components/main/LectureCard';
import MainPagination from '@/features/lectures/components/main/MainPagination';

import { categories } from '@/lib/mock-data';
import { getLecturesByQuery } from '@/services/lectures.service';
import { getParam } from '@/lib/utils';

interface PageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

const DEFAULT_CATEGORY = 'ALL';
const DEFAULT_LEVEL = 'ALL';
const DEFAULT_SORT = 'POPULAR';
const ITEMS_PER_PAGE = 16;

function normalize(raw: string | string[] | undefined, fallback: string) {
  if (!raw) return fallback;
  const v = getParam(raw);
  return (v || fallback).toUpperCase();
}

function parsePage(raw: string | string[] | undefined) {
  const v = getParam(raw);
  const n = parseInt(v || '1');
  return Number.isNaN(n) || n < 1 ? 1 : n;
}

export default async function MainPage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};

  const category = normalize(params.category, DEFAULT_CATEGORY);
  const level = normalize(params.level, DEFAULT_LEVEL);
  const sort = normalize(params.sort, DEFAULT_SORT);
  const page = parsePage(params.page);

  const lectures = await getLecturesByQuery({
    category,
    level,
    sort,
    page,
    limit: ITEMS_PER_PAGE,
  });

  const totalCount = lectures.totalCount ?? lectures.items.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));

  return (
    <div className="flex flex-col min-h-screen w-full">
      <MainVisual />

      <div className="py-12 md:py-20 bg-background flex justify-center">
        <div className="container px-4 md:px-8">
          {/* 필터 */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <Categories categories={categories} />

            <div className="flex items-center gap-4">
              <LevelFilter />
              <Sort />
            </div>
          </div>

          {/* 리스트 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {lectures.items.map((lecture) => (
              <LectureCard key={lecture.id} lecture={lecture} />
            ))}
          </div>

          {/* 페이지네이션 */}
          <div className="mt-12">
            <MainPagination
              currentPage={page}
              totalPages={totalPages}
              category={category}
              level={level}
              sort={sort}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
