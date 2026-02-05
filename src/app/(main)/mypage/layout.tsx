export default function MyPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-center p-10 gap-10 max-w-7xl w-full">
      {/* Sidebar 자리 */}
      {children}
    </div>
  );
}
