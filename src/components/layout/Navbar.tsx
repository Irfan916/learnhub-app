'use client';

import Link from 'next/link';
import { GraduationCap, Menu, Search, X, Bell } from 'lucide-react';
import { Suspense, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { ActiveNavLink } from './ActiveNavLink';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils/cn';
import Image from 'next/image';

const links = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses' },
  { href: '/instructors', label: 'Instructors' },
  { href: '/dashboard', label: 'Dashboard' },
];

function NavLinkFallback({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300"
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, hydrated } = useAuth();

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur',
        'dark:border-slate-800 dark:bg-slate-950/90'
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
            LearnHub
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Suspense
            fallback={
              <>
                {links.map((l) => (
                  <NavLinkFallback key={l.href} href={l.href} label={l.label} />
                ))}
              </>
            }
          >
            {links.map((l) => (
              <ActiveNavLink key={l.href} href={l.href} label={l.label} />
            ))}
          </Suspense>
        </nav>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              placeholder="Search courses..."
              className={cn(
                'h-9 w-56 rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none',
                'focus:bg-white focus:ring-2 focus:ring-indigo-100',
                'dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100',
                'dark:placeholder:text-slate-500 dark:focus:bg-slate-900 dark:focus:ring-indigo-900'
              )}
            />
          </div>
          <ThemeToggle />
          <button
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </button>
          {hydrated && user ? (
            <Link href="/dashboard">
              <Image
                src={user.avatar}
                alt={user.name}
                width={100}
                height={100}
                className="h-9 w-9 rounded-full border border-slate-200 dark:border-slate-700"
              />
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          )}
        </div>

        <div className="ml-auto flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-2 flex gap-2">
            <Link href="/login" className="flex-1">
              <Button variant="secondary" className="w-full">
                Login
              </Button>
            </Link>
            <Link href="/signup" className="flex-1">
              <Button className="w-full">Sign Up</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}