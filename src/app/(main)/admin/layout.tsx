import AdminSidebar from '@/components/layout/AdminSidebar';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex p-10 gap-10 w-full items-start">
      <AdminSidebar />
      {children}
    </div>
  );
}
