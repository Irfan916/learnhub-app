'use client';

import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4 lg:px-8">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
              LearnHub
            </span>
          </Link>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            Learn new skills. Build your future.
          </p>
        </div>
        {[
          {
            title: 'Learn',
            links: [
              ['Courses', '/courses'],
              ['Instructors', '/instructors'],
            ] as const,
          },
          {
            title: 'Account',
            links: [
              ['Dashboard', '/dashboard'],
              ['Settings', '/dashboard/settings'],
            ] as const,
          },
          {
            title: 'Company',
            links: [
              ['About', '#'],
              ['Contact', '#'],
            ] as const,
          },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {col.title}
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              {col.links.map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="hover:text-slate-900 dark:hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-500">
        © 2026 LearnHub Demo. Frontend only — no real transactions.
      </div>
    </footer>
  );
}