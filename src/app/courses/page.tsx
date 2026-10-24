'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CourseCard } from '@/components/courses/CourseCard';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { courses } from '@/data/courses';
import { categories } from '@/data/categories';
import { Difficulty } from '@/types';

export default function CoursesPage() {
  const [search, setSearch] = useState('');
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [price, setPrice] = useState<'all' | 'free' | 'paid'>('all');
  const [difficulty, setDifficulty] = useState<Difficulty[]>([]);
  const [sort, setSort] = useState('popular');

  const filtered = useMemo(() => {
    let r = courses.filter((c) => c.status === 'published');
    if (search) {
      const q = search.toLowerCase();
      r = r.filter((c) => c.title.toLowerCase().includes(q) || c.tags.some((t) => t.toLowerCase().includes(q)));
    }
    if (selectedCats.length) r = r.filter((c) => selectedCats.includes(c.category));
    if (price === 'free') r = r.filter((c) => c.price === 0);
    if (price === 'paid') r = r.filter((c) => c.price > 0);
    if (difficulty.length) r = r.filter((c) => difficulty.includes(c.difficulty));

    switch (sort) {
      case 'price-low': r = [...r].sort((a, b) => a.price - b.price); break;
      case 'price-high': r = [...r].sort((a, b) => b.price - a.price); break;
      case 'rating': r = [...r].sort((a, b) => b.rating - a.rating); break;
      default: r = [...r].sort((a, b) => b.enrollmentCount - a.enrollmentCount);
    }
    return r;
  }, [search, selectedCats, price, difficulty, sort]);

  const toggleCat = (name: string) =>
    setSelectedCats((prev) => prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name]);

  const toggleDiff = (d: Difficulty) =>
    setDifficulty((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]);

  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900">All Courses</h1>
        <p className="mt-1 text-sm text-slate-600">Showing {filtered.length} courses</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="space-y-6">
            <Card className="p-4">
              <h3 className="text-sm font-semibold text-slate-900">Categories</h3>
              <ul className="mt-3 space-y-2">
                {categories.map((c) => (
                  <li key={c.id}>
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                      <input type="checkbox" checked={selectedCats.includes(c.name)}
                        onChange={() => toggleCat(c.name)} className="h-4 w-4 rounded border-slate-300" />
                      {c.name}
                    </label>
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="p-4">
              <h3 className="text-sm font-semibold text-slate-900">Price</h3>
              <div className="mt-3 space-y-2 text-sm">
                {(['all', 'free', 'paid'] as const).map((p) => (
                  <label key={p} className="flex cursor-pointer items-center gap-2">
                    <input type="radio" name="price" checked={price === p}
                      onChange={() => setPrice(p)} className="h-4 w-4" />
                    {p[0].toUpperCase() + p.slice(1)}
                  </label>
                ))}
              </div>
            </Card>
            <Card className="p-4">
              <h3 className="text-sm font-semibold text-slate-900">Difficulty</h3>
              <div className="mt-3 space-y-2 text-sm">
                {(['Beginner', 'Intermediate', 'Advanced'] as Difficulty[]).map((d) => (
                  <label key={d} className="flex cursor-pointer items-center gap-2">
                    <input type="checkbox" checked={difficulty.includes(d)}
                      onChange={() => toggleDiff(d)} className="h-4 w-4 rounded" />
                    {d}
                  </label>
                ))}
              </div>
            </Card>
          </aside>

          <div>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input value={search} onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search courses..."
                  className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-indigo-100" />
              </div>
              <select value={sort} onChange={(e) => setSort(e.target.value)}
                className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none">
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {filtered.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-sm text-slate-600">No courses match your filters.</p>
                <Button className="mt-4" variant="secondary"
                  onClick={() => { setSearch(''); setSelectedCats([]); setPrice('all'); setDifficulty([]); }}>
                  Clear Filters
                </Button>
              </Card>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((c) => <CourseCard key={c.id} course={c} />)}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}