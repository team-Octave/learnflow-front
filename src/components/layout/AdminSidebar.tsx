import {
  BookOpenCheckIcon,
  LayoutDashboardIcon,
  MessageSquareWarningIcon,
  UserXIcon,
} from 'lucide-react';
import SidebarMenu from './SidebarMenu';

export default function AdminSidebar() {
  return (
    <div className="flex flex-col w-fit lg:min-w-60 h-fit bg-white/5 backdrop-blur-md p-4 gap-4 rounded-md border border-zinc-800 sticky top-26">
      <h2 className="text-white text-xl font-bold pl-1 hidden lg:flex">
        ADMIN
      </h2>
      <nav className="flex flex-col gap-2">
        <SidebarMenu>
          <LayoutDashboardIcon size={20} />
          <span className="hidden lg:flex">대시보드</span>
        </SidebarMenu>
        <SidebarMenu>
          <UserXIcon size={20} />
          <span className="hidden lg:flex">탈퇴 유저 관리</span>
        </SidebarMenu>
        <SidebarMenu href="/admin/audit">
          <BookOpenCheckIcon size={20} />
          <span className="hidden lg:flex">강의 검토</span>
        </SidebarMenu>
        <SidebarMenu>
          <MessageSquareWarningIcon size={20} />
          <span className="hidden lg:flex">악성 리뷰 관리</span>
        </SidebarMenu>
      </nav>
    </div>
  );
}
