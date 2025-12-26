import AuthChecker from '@/features/auth/components/AuthChecker';
import './globals.css';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

//전체 사이트에 공통으로 적용되는 전역 설정 파일
//Next.js App Router의 전역 레이아웃 파일
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${pretendard.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
      >
        {/* 모든 페이지(page.tsx) 내용을 여기에 렌더링. */}
        {children}
      </body>
      {/* 새로고침 시 다시 유저 정보 요청하도록하는 컴포넌트(유저 정보 검증) */}
      <AuthChecker />
    </html>
  );
}
