import {
  BookOpenCheckIcon,
  LayoutDashboardIcon,
  MessageSquareWarningIcon,
  UserXIcon,
} from 'lucide-react';
import Sidebar from '../layout/Sidebar';
import { SidebarItem } from '@/shared/types/SidebarItem';
export default function AdminSidebar() {
  const items: SidebarItem[] = [
    {
      key: 'dashboard',
      icon: <LayoutDashboardIcon size={20} />,
      label: '대시보드',
    },
    {
      key: 'withdrawn-users',
      icon: <UserXIcon size={20} />,
      label: '탈퇴 유저 관리',
    },
    {
      key: 'audit',
      href: '/admin/audit',
      icon: <BookOpenCheckIcon size={20} />,
      label: '강의 검토',
    },
    {
      key: 'bad-reviews',
      icon: <MessageSquareWarningIcon size={20} />,
      label: '악성 리뷰 관리',
    },
  ];

  return <Sidebar title="ADMIN" items={items} />;
}
