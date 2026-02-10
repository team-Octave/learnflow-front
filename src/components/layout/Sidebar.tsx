import { SidebarItem } from '@/shared/types/SidebarItem';
import SidebarMenu from './SidebarMenu';

interface SidebarProps {
  title?: string;
  items: SidebarItem[];
  className?: string;
  exact?: boolean;
}

export default function Sidebar({
  title,
  items,
  className,
  exact = false,
}: SidebarProps) {
  return (
    <div
      className={[
        'flex flex-col w-fit lg:min-w-60 h-fit bg-white/5 backdrop-blur-md p-4 gap-4 rounded-md border border-zinc-800 sticky top-26',
        className ?? '',
      ].join(' ')}
    >
      {title ? (
        <h2 className="text-white text-xl font-bold pl-1 hidden lg:flex">
          {title}
        </h2>
      ) : null}

      <nav className="flex flex-col gap-2">
        {items.map((item) => (
          <SidebarMenu key={item.key} href={item.href} exact={exact}>
            {item.icon}
            <span className="hidden lg:flex">{item.label}</span>
          </SidebarMenu>
        ))}
      </nav>
    </div>
  );
}
