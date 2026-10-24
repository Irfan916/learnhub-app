'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';

interface Props {
  href: string;
  label: string;
}

export function ActiveNavLink({ href, label }: Props) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'rounded-lg px-3 py-2 text-sm font-medium text-slate-600',
        'hover:bg-slate-100 hover:text-slate-900',
        'dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white',
        active && 'text-indigo-600 dark:text-indigo-400'
      )}
    >
      {label}
    </Link>
  );
}