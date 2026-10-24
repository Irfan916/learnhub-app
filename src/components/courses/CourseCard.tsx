'use client';

import Link from 'next/link';
import { Star, Users } from 'lucide-react';
import { Course } from '@/types';
import { instructors } from '@/data/instructors';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useDemoStore } from '@/hooks/useDemoStore';
import { toast } from 'react-toastify';
import Image from 'next/image';

interface Props {
    course: Course;
    variant?: 'default' | 'compact';
}

export function CourseCard({ course, variant = 'default' }: Props) {
    const instructor = instructors.find((i) => i.id === course.instructorId);
    const { isEnrolled, enroll } = useDemoStore();
    const enrolled = isEnrolled(course.id);

    const handleEnroll = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        enroll(course.id);
        toast.success(`Enrolled in "${course.title}"`);
    };

    const formatCount = (n: number) =>
        n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`;

    if (variant === 'compact') {
        return (
            <Link
                href={`/courses/${course.slug}`}
                className="group flex gap-3 rounded-xl border border-slate-200 bg-white p-3 transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
                <div className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                    <Image
                        src={course.thumbnail}
                        alt={course.title}
                        width={800}
                        height={600}
                        className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {course.title}
                    </h3>
                    {instructor && (
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            {instructor.name}
                        </p>
                    )}
                    <div className="mt-2 flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            {course.rating}
                        </span>
                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                            {course.price === 0 ? 'Free' : `$${course.price}`}
                        </span>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link href={`/courses/${course.slug}`} className="group block">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <Image
                        src={course.thumbnail}
                        alt={course.title}
                        width={800}
                        height={600}
                        className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                    <div className="absolute left-3 top-3 flex gap-1">
                        <Badge tone="info">{course.category}</Badge>
                    </div>
                    {course.originalPrice && (
                        <div className="absolute right-3 top-3">
                            <Badge tone="danger">
                                {Math.round((1 - course.price / course.originalPrice) * 100)}% off
                            </Badge>
                        </div>
                    )}
                </div>
                <div className="space-y-2 p-4">
                    <h3 className="line-clamp-2 font-semibold text-slate-900 dark:text-slate-100">
                        {course.title}
                    </h3>
                    {instructor && (
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            {instructor.name}
                        </p>
                    )}
                    <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            {course.rating} ({formatCount(course.reviewCount)})
                        </span>
                        <span className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" />
                            {formatCount(course.enrollmentCount)}
                        </span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                        <div className="text-base font-bold text-slate-900 dark:text-slate-100">
                            {course.price === 0 ? 'Free' : `$${course.price}`}
                            {course.originalPrice && (
                                <span className="ml-1 text-xs font-normal text-slate-400 line-through dark:text-slate-500">
                                    ${course.originalPrice}
                                </span>
                            )}
                        </div>
                        <Button size="sm" onClick={handleEnroll} disabled={enrolled}>
                            {enrolled ? 'Enrolled' : 'Enroll'}
                        </Button>
                    </div>
                </div>
            </div>
        </Link>
    );
}