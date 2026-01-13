import AdminSidebar from '@/components/layout/AdminSidebar';
import { Toaster } from '@/components/ui/sonner';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex p-10 gap-10 w-full">
      {/* AdminSidebar 자리 */}
      <AdminSidebar />
      <Toaster position="top-center" />
      {children}
    </div>
  );
}
