import './globals.css';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2', // 폰트 파일 경로 (알맞게 수정하세요)
  display: 'swap',
  weight: '45 920', // 가변 폰트 웨이트 범위 설정
  variable: '--font-pretendard', // CSS 변수 이름 지정
});

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
        {children}
      </body>
    </html>
  );
}
