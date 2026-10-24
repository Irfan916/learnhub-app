'use client';

import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CourseCard } from '@/components/courses/CourseCard';
import { CourseFilters, Filters } from '@/components/courses/CourseFilters';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { courses } from '@/data/courses';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils/cn';

const DEFAULT_FILTERS: Filters = {
  categories: [],
  price: 'all',
  difficulty: [],
  rating: 0,
};

export default function CoursesPage() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState('popular');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let r = courses.filter((c) => c.status === 'published');

    if (search) {
      const q = search.toLowerCase();
      r = r.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (filters.categories.length) {
      r = r.filter((c) => filters.categories.includes(c.category));
    }
    if (filters.price === 'free') r = r.filter((c) => c.price === 0);
    if (filters.price === 'paid') r = r.filter((c) => c.price > 0);
    if (filters.difficulty.length) {
      r = r.filter((c) => filters.difficulty.includes(c.difficulty));
    }
    if (filters.rating > 0) r = r.filter((c) => c.rating >= filters.rating);

    switch (sort) {
      case 'price-low':
        r = [...r].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        r = [...r].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        r = [...r].sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        r = [...r].sort(
          (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt)
        );
        break;
      default:
        r = [...r].sort((a, b) => b.enrollmentCount - a.enrollmentCount);
    }
    return r;
  }, [search, filters, sort]);

  const activeChips = [
    ...filters.categories.map((c) => ({ type: 'category' as const, label: c })),
    ...(filters.price !== 'all'
      ? [{ type: 'price' as const, label: filters.price }]
      : []),
    ...filters.difficulty.map((d) => ({ type: 'difficulty' as const, label: d })),
    ...(filters.rating > 0
      ? [{ type: 'rating' as const, label: `${filters.rating}+ stars` }]
      : []),
  ];

  const clearAll = () => {
    setFilters(DEFAULT_FILTERS);
    setSearch('');
  };

  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            All Courses
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Showing {filtered.length} of {courses.length} courses
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Desktop filters */}
          <aside className="hidden lg:block">
            <CourseFilters value={filters} onChange={setFilters} />
          </aside>

          <div>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search courses..."
                  className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-indigo-900"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <Button
                  variant="secondary"
                  className="lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </Button>
              </div>
            </div>

            {activeChips.length > 0 && (
              <div className="mb-4 flex flex-wrap items-center gap-2">
                {activeChips.map((chip, i) => (
                  <Badge key={i} tone="info">
                    {chip.label}
                  </Badge>
                ))}
                <button
                  onClick={clearAll}
                  className="text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                >
                  Clear all
                </button>
              </div>
            )}

            {filtered.length === 0 ? (
              <EmptyState
                title="No courses found"
                description="Try adjusting your search or filters to find what you're looking for."
                action={
                  <Button variant="secondary" onClick={clearAll}>
                    Clear Filters
                  </Button>
                }
              />
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((c) => (
                  <CourseCard key={c.id} course={c} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div
            className={cn(
              'absolute right-0 top-0 h-full w-80 overflow-y-auto bg-white p-4 shadow-xl',
              'dark:bg-slate-900'
            )}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Filters
              </h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="rounded p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <CourseFilters value={filters} onChange={setFilters} />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}