'use client';
import { cn } from '@/shared/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import path from 'path';
import { toast } from 'sonner';

interface SidebarMenuProps {
  href?: string;
  children: React.ReactNode;
  exact: boolean;
}

export default function SidebarMenu({
  href,
  children,
  exact,
}: SidebarMenuProps) {
  const pathname = usePathname();
  const isActive = exact
    ? pathname === href
    : pathname === href || pathname.startsWith(href + '/');

  console.log(pathname, href);
  return (
    <>
      {href ? (
        <Link
          href={href}
          className={cn(
            'flex px-2.5 py-3 lg:gap-3 rounded-md text-sm text-zinc-300 hover:text-white cursor-pointer hover:bg-zinc-500/10',
            isActive &&
              'text-primary bg-primary/10 hover:text-primary hover:bg-primary/10',
          )}
        >
          {children}
        </Link>
      ) : (
        <div
          onClick={() => toast.info('서비스 준비 중입니다.')}
          className="flex px-2.5 py-3 lg:gap-3 rounded-md text-sm text-zinc-300 hover:text-white cursor-pointer hover:bg-zinc-500/10"
        >
          {children}
        </div>
      )}
    </>
  );
}
