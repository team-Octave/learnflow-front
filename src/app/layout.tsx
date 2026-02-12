import './globals.css';
import localFont from 'next/font/local';
import UserInitializer from '@/features/auth/components/UserInitializer';
import { getUserAction } from '@/features/auth/actions';
import { Toaster } from '@/components/ui/sonner';
import { ConfirmProvider } from '@/components/common/ConfirmProvider';
import AnalyticsTracker from '@/components/common/AnalyticsTracker';
import type { Metadata } from 'next';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://learnflow.shop'),

  title: {
    default: 'LearnFlow',
    template: '%s | 프로그래밍 맞춤형 학습 플랫폼',
  },

  description:
    '프로그래밍 강의 중심의 온라인 학습 플랫폼입니다. AI 요약과 체계적인 강의·커리큘럼 관리로 학습 효율을 높이고, 멤버십 혜택과 편리한 수강 환경을 제공합니다.',

  alternates: {
    canonical: '/',
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'LearnFlow',
    title: 'LearnFlow | 프로그래밍 맞춤형 학습 플랫폼',
    description:
      '프로그래밍 강의 중심의 온라인 학습 플랫폼입니다. AI 요약과 체계적인 강의·커리큘럼 관리로 학습 효율을 높이고, 멤버십 혜택과 편리한 수강 환경을 제공합니다.',
    images: [
      { url: '/images/og.png', width: 800, height: 500, alt: 'LearnFlow' },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'LearnFlow | 프로그래밍 맞춤형 학습 플랫폼',
    description:
      '프로그래밍 강의 중심의 온라인 학습 플랫폼입니다. AI 요약과 체계적인 강의·커리큘럼 관리로 학습 효율을 높이고, 멤버십 혜택과 편리한 수강 환경을 제공합니다.',
    images: ['/images/og.png'],
  },
};

//전체 사이트에 공통으로 적용되는 전역 설정 파일
//Next.js App Router의 전역 레이아웃 파일
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const state = await getUserAction();
  const user = state.success ? state.data : null;

  return (
    <html lang="ko" className="dark">
      <body
        className={`${pretendard.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
      >
        <UserInitializer user={user} />
        <Toaster position="top-center" />
        <ConfirmProvider />
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
