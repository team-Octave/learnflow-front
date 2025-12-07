'use client';

import { Tabs } from '@/components/ui/tabs';
import { useRouter, useSearchParams } from 'next/navigation';

interface LearningTabsProps {
  children: React.ReactNode;
  defaultTab: string;
}

export default function LearningTabs({
  children,
  defaultTab,
}: LearningTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', value);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Tabs
      defaultValue={defaultTab}
      onValueChange={handleTabChange}
      className="gap-8"
    >
      {children}
    </Tabs>
  );
}
