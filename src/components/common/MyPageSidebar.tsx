import { CrownIcon, UserIcon } from 'lucide-react';
import Sidebar from '../layout/Sidebar';
import { SidebarItem } from '@/shared/types/SidebarItem';

export default function MyPageSidebar() {
  const items: SidebarItem[] = [
    {
      key: 'profile',
      icon: <UserIcon size={20} />,
      label: '프로필 관리',
      href: '/mypage',
    },
    {
      key: 'membership',
      icon: <CrownIcon size={20} />,
      label: '멤버십 관리',
      href: 'mypage/membership',
    },
  ];

  return <Sidebar title="마이페이지" items={items} />;
}
