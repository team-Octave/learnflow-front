import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'border-primary/30 bg-primary/15  text-primary [a&]:hover:bg-primary/90',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive: 'bg-red-500/15 text-red-500 border-red-500/30',
        outline: 'bg-zinc-500/15 text-zinc-500 border-zinc-500/30',

        BEGINNER: 'bg-emerald-900/30 text-emerald-300 border-emerald-800',
        INTERMEDIATE: 'bg-yellow-900/30 text-yellow-300 border-yellow-800',
        ADVANCED: 'bg-red-900/30 text-red-300 border-red-800',

        //  lesson type 추가
        QUIZ: 'bg-emerald-900/30 text-emerald-300 border-emerald-800',
        VIDEO: 'bg-indigo-900/30 text-indigo-300 border-indigo-800',

        // 정답 o x 표시 추가
        O: 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30 dark:text-emerald-400',
        X: 'bg-rose-500/15 text-rose-600 border-rose-500/30 dark:text-rose-400',

        free: 'bg-green-500/15 text-green-500 border-green-500/30',
        membership: 'bg-pink-500/15 text-pink-500 border-pink-500/30',

        published: 'bg-green-500/15 text-green-500 border-green-500/30',
        submitted: 'bg-yellow-500/15 text-yellow-500 border-yellow-500/30',

        // 결제 상태 추가
        paymentDone: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        paymentCanceled: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        paymentAborted: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
