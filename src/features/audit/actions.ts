// src/features/audit/actions.ts
'use server';

import type {
  AuditActionState,
  AuditLecture,
  AuditLectureListResponse,
} from './types';

const PAGE_SIZE = 4;

/**
 * ✅ API 오면 여기만 교체하면 됨.
 * 지금은 MOCK으로 동작.
 */
async function fetchAuditLectures(
  page: number,
): Promise<AuditLectureListResponse> {
  // TODO: API 받으면 아래처럼 교체
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/audit?page=${page}&size=${PAGE_SIZE}`,
  //   { cache: 'no-store' },
  // );
  // if (!res.ok) throw new Error('강의 검토 목록 API 요청 실패');
  // return (await res.json()) as AuditLectureListResponse;

  // MOCK
  const all = mockAuditLectures();

  const totalItems = all.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);

  const start = (safePage - 1) * PAGE_SIZE;
  const items = all.slice(start, start + PAGE_SIZE);

  return {
    items,
    page: safePage,
    pageSize: PAGE_SIZE,
    totalItems,
    totalPages,
  };
}

export async function getAuditLecturesAction(
  page: number,
): Promise<AuditActionState<AuditLectureListResponse>> {
  try {
    const data = await fetchAuditLectures(page);
    return { success: true, data };
  } catch (e) {
    const message =
      e instanceof Error ? e.message : '강의 검토 목록을 불러오지 못했습니다.';
    return { success: false, error: message };
  }
}

function mockAuditLectures(): AuditLecture[] {
  const base: Omit<AuditLecture, 'id' | 'requestedAt'>[] = [
    {
      title: '리액트 마스터 클래스: 기초부터 심화까지',
      instructorNickname: 'frontend_master',
      thumbnailUrl: null,
    },
    {
      title: '실전! Next.js 14로 만드는 블로그',
      instructorNickname: 'nextjs_guru',
      thumbnailUrl: null,
    },
    {
      title: '타입스크립트 디자인 패턴 완벽 가이드',
      instructorNickname: 'ts_wizard',
      thumbnailUrl: null,
    },
    {
      title: '모던 자바스크립트 딥다이브',
      instructorNickname: 'js_ninja',
      thumbnailUrl: null,
    },
  ];

  const now = Date.now();

  return Array.from({ length: 12 }).map((_, i) => {
    const seed = base[i % base.length];
    return {
      id: 1000 + i,
      ...seed,
      requestedAt: new Date(now - i * 1000 * 60 * 60 * 18).toISOString(),
    };
  });
}
