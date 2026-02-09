import './globals.css';
import localFont from 'next/font/local';
import UserInitializer from '@/features/auth/components/UserInitializer';
import { getUserAction } from '@/features/auth/actions';
import { Toaster } from '@/components/ui/sonner';
import { ConfirmProvider } from '@/components/common/ConfirmProvider';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

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
    <html lang="en" className="dark">
      <body
        className={`${pretendard.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
      >
        <UserInitializer user={user} />
        <Toaster position="top-center" />
        <ConfirmProvider />
        {children}
      </body>
    </html>
  );
}
