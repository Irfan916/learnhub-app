'use client';

import { X } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { categories } from '@/data/categories';
import { Difficulty } from '@/types';

export interface Filters {
  categories: string[];
  price: 'all' | 'free' | 'paid';
  difficulty: Difficulty[];
  rating: number;
}

interface Props {
  value: Filters;
  onChange: (next: Filters) => void;
}

export function CourseFilters({ value, onChange }: Props) {
  const toggleCategory = (name: string) => {
    const next = value.categories.includes(name)
      ? value.categories.filter((c) => c !== name)
      : [...value.categories, name];
    onChange({ ...value, categories: next });
  };

  const toggleDifficulty = (d: Difficulty) => {
    const next = value.difficulty.includes(d)
      ? value.difficulty.filter((x) => x !== d)
      : [...value.difficulty, d];
    onChange({ ...value, difficulty: next });
  };

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Categories
        </h3>
        <ul className="mt-3 space-y-2">
          {categories.map((c) => (
            <li key={c.id}>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={value.categories.includes(c.name)}
                  onChange={() => toggleCategory(c.name)}
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 dark:border-slate-600 dark:bg-slate-800"
                />
                {c.name}
              </label>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-4">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Price
        </h3>
        <div className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
          {(['all', 'free', 'paid'] as const).map((p) => (
            <label key={p} className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="price"
                checked={value.price === p}
                onChange={() => onChange({ ...value, price: p })}
                className="h-4 w-4 text-indigo-600"
              />
              {p[0].toUpperCase() + p.slice(1)}
            </label>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Difficulty
        </h3>
        <div className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
          {(['Beginner', 'Intermediate', 'Advanced'] as Difficulty[]).map((d) => (
            <label key={d} className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={value.difficulty.includes(d)}
                onChange={() => toggleDifficulty(d)}
                className="h-4 w-4 rounded text-indigo-600"
              />
              {d}
            </label>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Rating
        </h3>
        <div className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
          {[4.5, 4.0, 3.5].map((r) => (
            <label key={r} className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="rating"
                checked={value.rating === r}
                onChange={() => onChange({ ...value, rating: r })}
                className="h-4 w-4 text-indigo-600"
              />
              {r} & up
            </label>
          ))}
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="rating"
              checked={value.rating === 0}
              onChange={() => onChange({ ...value, rating: 0 })}
              className="h-4 w-4 text-indigo-600"
            />
            Any
          </label>
        </div>
      </Card>

      <Button
        variant="secondary"
        className="w-full"
        onClick={() =>
          onChange({ categories: [], price: 'all', difficulty: [], rating: 0 })
        }
      >
        <X className="h-4 w-4" />
        Clear Filters
      </Button>
    </div>
  );
}