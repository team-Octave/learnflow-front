
import { Lecture } from '@/features/lectures/types';

export const categories = [
  { id: 'c1', name: '전체', value: 'all' },
  { id: 'c2', name: '개발', value: 'development' },
  { id: 'c3', name: '디자인', value: 'design' },
  { id: 'c4', name: '비즈니스', value: 'business' },
  { id: 'c5', name: '마케팅', value: 'marketing' },
];

export const courses: Lecture[] = [
  {
    id: 'course-1',
    title: 'Next.js 15 완벽 가이드: 프로덕션 레벨 앱 만들기',
    instructor: '이영희',
    price: 129000,
    rating: 4.9,
    studentCount: 3420,
    thumbnail:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop',
    category: 'development',
    difficulty: 'intermediate',
    createdAt: '2024-03-15T09:00:00Z',
    description:
      '최신 Next.js 15의 모든 기능을 마스터하고, 실제 상용 서비스를 구축해보는 실전 강의입니다.',
    curriculum: [
      {
        id: 'sec-1',
        title: '섹션 1: Next.js 소개 및 환경 설정',
        lessons: [
          {
            id: 'l-1-1',
            title: 'Next.js란 무엇인가?',
            duration: '10:00',
            type: 'video',
          },
          {
            id: 'l-1-2',
            title: '개발 환경 설정하기',
            duration: '15:30',
            type: 'video',
          },
        ],
      },
      {
        id: 'sec-2',
        title: '섹션 2: App Router 기초',
        lessons: [
          {
            id: 'l-2-1',
            title: 'Routing 기본',
            duration: '12:45',
            type: 'video',
          },
          {
            id: 'l-2-2',
            title: 'Layouts & Templates',
            duration: '18:20',
            type: 'video',
          },
        ],
      },
    ],
  },
  // ... course-2, course-3 등 그대로 이어서 추가
  {
    id: 'course-2',
    title: 'UI/UX 디자인 마스터 클래스: 피그마 기초부터 심화까지',
    instructor: '박지성',
    price: 89000,
    rating: 4.8,
    studentCount: 2150,
    thumbnail:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop',
    category: 'design',
    difficulty: 'beginner',
    createdAt: '2024-02-10T14:30:00Z',
    description:
      '디자인 비전공자도 쉽게 따라할 수 있는 UI/UX 디자인 강의입니다. 피그마 툴 사용법부터 실제 앱 디자인 프로젝트까지 진행합니다.',
    curriculum: [],
  },
  {
    id: 'course-3',
    title: '실전 마케팅 전략: 0원으로 시작하는 그로스 해킹',
    instructor: '최민수',
    price: 150000,
    rating: 4.7,
    studentCount: 1890,
    thumbnail:
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop',
    category: 'marketing',
    difficulty: 'advanced',
    createdAt: '2024-01-20T11:00:00Z',
    description:
      '스타트업 마케터가 알려주는 실전 그로스 해킹 전략. 데이터 분석을 통한 마케팅 효율 최적화 방법을 배웁니다.',
    curriculum: [],
  },
  {
    id: 'course-4',
    title: '타입스크립트 핸드북: 안전한 자바스크립트 작성하기',
    instructor: '김철수',
    price: 55000,
    rating: 4.9,
    studentCount: 5600,
    thumbnail:
      'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2128&auto=format&fit=crop',
    category: 'development',
    difficulty: 'beginner',
    createdAt: '2023-12-05T10:15:00Z',
    description:
      '자바스크립트 개발자라면 필수로 알아야 할 타입스크립트. 기초 문법부터 고급 타입 추론까지 완벽하게 정리해드립니다.',
    curriculum: [],
  },
  {
    id: 'course-5',
    title: '비즈니스 영어 이메일 작성법',
    instructor: 'Sarah Kim',
    price: 45000,
    rating: 4.6,
    studentCount: 1200,
    thumbnail:
      'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=2070&auto=format&fit=crop',
    category: 'business',
    difficulty: 'beginner',
    createdAt: '2024-03-01T09:30:00Z',
    description:
      '글로벌 비즈니스 환경에서 통하는 세련된 영어 이메일 작성법. 상황별 템플릿과 필수 표현을 학습합니다.',
    curriculum: [],
  },
];
