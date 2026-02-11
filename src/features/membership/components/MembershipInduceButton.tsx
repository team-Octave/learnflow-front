import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function MembershipInduceButton() {
  return (
    <Link href={'/payment'}>
      <Button variant={'default'} size={'sm'}>
        멤버십 가입하기
      </Button>
    </Link>
  );
}
