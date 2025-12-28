// learnflow-front/src/app/(main)/layout.tsx
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getUserAction } from '@/features/auth/actions';

//MainLayout이라는 레이아웃 컴포넌트를 정의.
//페이지 전체 레이아웃을 잡아주는 컴포넌트.
export default async function MainLayout({
  children, //이 레이아웃 안에 들어가는 실제 페이지 내용.
}: Readonly<{
  //children을 수정 못 하게 하는 타입 설정(그냥 타입 안정성용).
  children: React.ReactNode;
}>) {
  const state = await getUserAction();
  const user = state.success ? state.data : null;
  return (
    <div className="flex flex-col min-h-screen">
      <Header initialUser={user} />
      <main className="flex-1 w-full flex flex-col items-center">
        {/* 실제 각 페이지 내용이 여기 들어감. */}
        {children}
      </main>
      {/* antigravity : <main className="flex-1 flex flex-col justify-start items-center">{children}</main> */}
      <Footer />
    </div>
  );
}
