export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/* AdminSidebar 자리 */}
      {children}
    </div>
  );
}
