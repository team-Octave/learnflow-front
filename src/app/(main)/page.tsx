// learnflow-front/src/app/(main)/page.tsx
'use client';

import { useState, useMemo, useEffect } from 'react';

// 서비스 & 데이터
import { getAllLectures } from '@/services/lectures.service';
import { categories } from '@/lib/mock-data';

// 메인 UI 컴포넌트들
import MainVisual from '@/features/lectures/components/main/MainVisual';
import Categories from '@/features/lectures/components/main/Categories';
import LevelFilter from '@/features/lectures/components/main/LevelFilter';
import Sort from '@/features/lectures/components/main/Sort';
import LectureCard from '@/features/lectures/components/main/LectureCard';
import MainPagination from '@/features/lectures/components/main/MainPagination';

export default function MainPage() {
  const lectures = getAllLectures(); // mock-data에서 전체 강의를 가져옴

  // 상태값 정의
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedSort, setSelectedSort] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 16;

  // 필터링 + 정렬 처리 : lectures 복사해서 result에 넣고 필터/정렬에 따라 수정해나가는 구조.
  const filteredLectures = useMemo(() => {
    let result = [...lectures];

    // 카테고리 필터
    if (selectedCategory !== 'ALL') {
      result = result.filter(
        (lecture) => lecture.category === selectedCategory,
      );
    }

    // 난이도 필터
    if (selectedLevel !== 'all') {
      result = result.filter((lecture) => lecture.level === selectedLevel);
    }

    //  정렬 옵션 (수강생순 기본 / 최신순 / 별점순)
    switch (selectedSort) {
      case 'popular':
        result.sort((a, b) => b.enrollmentCount - a.enrollmentCount);
        break;

      case 'newest':
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;

      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [lectures, selectedCategory, selectedLevel, selectedSort]); //useMemo의 의존성 배열 @@

  // 필터 변경 시 페이지 초기화
  // useMemo(() => {
  //   setCurrentPage(1); //사용자가 필터를 바꾸면 자동으로 1페이지로 이동해야 하니까.
  // }, [selectedCategory, selectedLevel, selectedSort]);

  // 필터 변경 시 페이지 초기화
  useEffect(() => {
    setCurrentPage(1); // 필터 변경 시 1페이지로 초기화
  }, [selectedCategory, selectedLevel, selectedSort]);

  // 페이지네이션
  const totalPages = Math.ceil(filteredLectures.length / ITEMS_PER_PAGE); //전체 페이지 수 계산
  // 현재 페이지에 보여줄 데이터 자르기
  const paginatedLectures = filteredLectures.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

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
              selected={selectedCategory} //현재 선택된 카테고리가 무엇인지 문자열로 내려주는 것, FRONTEND' | 'BACKEND' 등
              onSelect={setSelectedCategory} //클릭했을 때 실행되는 콜백 함수.
            />

            {/* 드롭다운메뉴 : 난이도필터, 정렬 */}
            <div className="flex items-center gap-4">
              <LevelFilter
                selectedLevel={selectedLevel}
                setSelectedLevel={setSelectedLevel}
              />
              <Sort
                selectedSort={selectedSort}
                setSelectedSort={setSelectedSort}
              />
            </div>
          </div>

          {/* 강의 카드 리스트 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedLectures.map((lecture) => (
              <LectureCard key={lecture.id} lecture={lecture} />
            ))}
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="mt-12">
              <MainPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
