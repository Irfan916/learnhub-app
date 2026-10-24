import { Star } from 'lucide-react';

export function CourseRating({ rating, count }: { rating: number; count?: number }) {
  return (
    <div className="flex items-center gap-1 text-sm">
      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
      <span className="font-semibold text-slate-900">{rating.toFixed(1)}</span>
      {count !== undefined && <span className="text-slate-500">({count})</span>}
    </div>
  );
}