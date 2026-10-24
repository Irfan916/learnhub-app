'use client';

import Image from 'next/image';
import { Star, Users, Clock, Globe, Award } from 'lucide-react';
import { Course } from '@/types';
import { instructors } from '@/data/instructors';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useDemoStore } from '@/hooks/useDemoStore';
import { toast } from 'react-toastify';
import Link from 'next/link';

interface Props {
  course: Course;
}

export function CourseDetailHeader({ course }: Props) {
  const instructor = instructors.find((i) => i.id === course.instructorId);
  const { isEnrolled, enroll } = useDemoStore();
  const enrolled = isEnrolled(course.id);

  const handleEnroll = () => {
    enroll(course.id);
    toast.success(
      course.price === 0
        ? 'Enrolled for free — starting now!'
        : 'Enrolled (demo — no real charge was made)'
    );
  };

  const formatCount = (n: number) =>
    n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`;

  return (
    <div className="border-b border-slate-200 bg-linear-to-b from-slate-50 to-white dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1.6fr_1fr] lg:px-8">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Badge tone="info">{course.category}</Badge>
            <Badge tone="default">{course.difficulty}</Badge>
            {course.featured && <Badge tone="warning">Featured</Badge>}
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 sm:text-4xl">
            {course.title}
          </h1>
          <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">
            {course.description}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {course.rating}
              </span>
              ({formatCount(course.reviewCount)} reviews)
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {formatCount(course.enrollmentCount)} students
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              {course.language}
            </span>
            <span className="flex items-center gap-1">
              <Award className="h-4 w-4" />
              Certificate
            </span>
          </div>

          {instructor && (
            <div className="mt-6 flex items-center gap-3">
              <Image
                src={instructor.avatar}
                alt={instructor.name}
                width={100}
                height={100}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Created by
                </p>
                <p className="font-semibold text-slate-900 dark:text-slate-100">
                  {instructor.name}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-20 lg:self-start">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">
            <div className="relative aspect-video bg-slate-100 dark:bg-slate-800">
              <Image
                src={course.thumbnail}
                alt={course.title}
                fill
                sizes="(min-width: 1024px) 400px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-4 p-5">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  {course.price === 0 ? 'Free' : `$${course.price}`}
                </span>
                {course.originalPrice && (
                  <span className="text-sm text-slate-400 line-through dark:text-slate-500">
                    ${course.originalPrice}
                  </span>
                )}
              </div>

              {enrolled ? (
                <Link href={`/learn/${course.slug}`} className="block">
                  <Button className="w-full" size="lg">
                    Continue Learning
                  </Button>
                </Link>
              ) : (
                <Button className="w-full" size="lg" onClick={handleEnroll}>
                  {course.price === 0 ? 'Enroll for Free' : 'Enroll Now'}
                </Button>
              )}

              <p className="text-center text-xs text-slate-500 dark:text-slate-400">
                {course.price === 0
                  ? 'Free course — instant access'
                  : 'Demo only: no real payment will be processed'}
              </p>

              <ul className="space-y-2 border-t border-slate-200 pt-4 text-sm dark:border-slate-800">
                <li className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Duration</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {course.duration}
                  </span>
                </li>
                <li className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Level</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {course.difficulty}
                  </span>
                </li>
                <li className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Lessons</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {course.curriculum.reduce((n, s) => n + s.lessons.length, 0)}
                  </span>
                </li>
                <li className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Certificate</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    Included
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}