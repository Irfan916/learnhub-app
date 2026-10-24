import { Course } from '@/types';
import { CourseCard } from './CourseCard';

interface Props {
  courses: Course[];
  columns?: 2 | 3 | 4;
}

const colMap = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

export function CourseGrid({ courses, columns = 3 }: Props) {
  return (
    <div className={`grid gap-6 ${colMap[columns]}`}>
      {courses.map((c) => (
        <CourseCard key={c.id} course={c} />
      ))}
    </div>
  );
}