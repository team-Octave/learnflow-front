import AdminSidebar from '@/components/common/AdminSidebar';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-center p-10 gap-10 max-w-7xl w-full">
      {/* AdminSidebar 자리 */}
      <AdminSidebar />
      {children}
    </div>
  );
}
