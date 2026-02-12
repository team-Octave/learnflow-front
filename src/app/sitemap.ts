import { getLecturesAction } from '@/features/lectures/actions';
import { Lecture } from '@/features/lectures/types';
import { MetadataRoute } from 'next';

async function getAllLectureIds() {
  let allIds: string[] = [];
  let page = 1;
  let hasNextPage = true;
  while (hasNextPage) {
    const state = await getLecturesAction({
      category: 'ALL',
      level: 'ALL',
      sort: 'LATEST',
      page: page,
      limit: 16,
    });
    if (!state.success) {
      break;
    }

    const ids = state.data.contents.map((lecture: Lecture) => lecture.id);
    allIds = [...allIds, ...ids];

    hasNextPage = state.data.pageable.pageNumber + 1 < state.data.totalPages;
    page++;
  }

  return allIds;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://learnflow.shop';

  // 1. 동적 페이지 경로 생성 (/detail/[id])
  const ids = await getAllLectureIds();
  const detailUrls = ids.map((id) => ({
    url: `${baseUrl}/detail/${id}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  // 2. 정적 페이지 경로
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      priority: 0.5,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: new Date(),
      priority: 0.5,
    },
  ];

  return [...staticUrls, ...detailUrls];
}
