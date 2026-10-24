import { Course } from '@/types';
import { CourseCard } from './CourseCard';

export function CourseGrid({ courses }: { courses: Course[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((c) => <CourseCard key={c.id} course={c} />)}
    </div>
  );
}