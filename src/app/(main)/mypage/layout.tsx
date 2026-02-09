import MyPageSidebar from '@/components/common/MyPageSidebar';

export default function MyPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-center p-10 gap-10 max-w-7xl w-full">
      <MyPageSidebar />
      {children}
    </div>
  );
}
