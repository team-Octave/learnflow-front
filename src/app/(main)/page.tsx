// src/app/(main)/page.tsx
import MainVisual from '@/features/lectures/components/main/MainVisual';
import Categories from '@/features/lectures/components/main/Categories';
import LevelFilter from '@/features/lectures/components/main/LevelFilter';
import SortSelect from '@/features/lectures/components/main/SortSelect';
import LectureCard from '@/features/lectures/components/main/LectureCard';
import MainPagination from '@/features/lectures/components/main/MainPagination';
import { getParam } from '@/shared/utils';
import { Category, Lecture, Level, Sort } from '@/features/lectures/types';
import { getLecturesAction } from '@/features/lectures/actions';
import { notFound, redirect } from 'next/navigation';

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
interface PageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function MainPage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};

  const category = normalize(params.category, DEFAULT_CATEGORY) as Category;
  const level = normalize(params.level, DEFAULT_LEVEL) as Level;
  const sort = normalize(params.sort, DEFAULT_SORT) as Sort;
  const page = parsePage(params.page);

  const state = await getLecturesAction({
    category,
    level,
    sort,
    page,
    limit: ITEMS_PER_PAGE,
  });

  if (!state.success) {
    console.log(state.message);
    return notFound();
  }

  const data = state.data;

  const lectures: Lecture[] = data.content;
  const pageNumber = data.pageable.pageNumber + 1;
  const totalPages = data.totalPages;

  if (isNaN(page) || page <= 0 || page - 1 > totalPages) {
    redirect(`/`);
  }

  return (
    <div className="flex flex-col min-h-screen w-full">
      <MainVisual />

      <div className="py-12 md:py-20 bg-background flex justify-center">
        <div className="container px-4 md:px-8">
          {/* 필터 */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <Categories />

            <div className="flex items-center gap-4">
              <LevelFilter />
              <SortSelect />
            </div>
          </div>

          {/* 리스트 */}
          {lectures.length === 0 ? (
            <div>조건에 맞는 강의가 없습니다.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {lectures.map((lecture) => (
                <LectureCard key={lecture.id} lecture={lecture} />
              ))}
            </div>
          )}

          {/* 페이지네이션 */}
          <div className="mt-12">
            <MainPagination currentPage={pageNumber} totalPages={totalPages} />
          </div>
        </div>
      </div>
    </div>
  );
}
