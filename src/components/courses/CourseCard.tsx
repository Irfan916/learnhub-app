'use client';

import Link from 'next/link';
import { Star, Users } from 'lucide-react';
import { Course } from '@/types';
import { instructors } from '@/data/instructors';
import { Button } from '@/components/ui/Button';
import { useDemoStore } from '@/hooks/useDemoStore';
import { toast } from 'react-toastify';
import Image from 'next/image';

export function CourseCard({ course }: { course: Course }) {
    const instructor = instructors.find((i) => i.id === course.instructorId);
    const { isEnrolled, enroll } = useDemoStore();
    const enrolled = isEnrolled(course.id);

    const handleEnroll = (e: React.MouseEvent) => {
        e.preventDefault();
        enroll(course.id);
        toast.success(`Enrolled in "${course.title}"`);
    };

    return (
        <Link href={`/courses/${course.slug}`} className="group block">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <Image src={course.thumbnail} alt={course.title}
                        width={800}
                        height={600}
                        className="h-full w-full object-cover transition group-hover:scale-105" />
                </div>
                <div className="space-y-2 p-4">
                    <h3 className="line-clamp-2 font-semibold text-slate-900 dark:text-slate-100">{course.title}</h3>
                    {instructor && <p className="text-xs text-slate-500 dark:text-slate-400">{instructor.name}</p>}
                    <div className="flex items-center gap-3 text-xs text-slate-600">
                        <span className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            {course.rating} ({course.reviewCount >= 1000 ? `${(course.reviewCount / 1000).toFixed(1)}k` : course.reviewCount})
                        </span>
                        <span className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" />
                            {course.enrollmentCount >= 1000 ? `${(course.enrollmentCount / 1000).toFixed(1)}k` : course.enrollmentCount}
                        </span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                        <div className="text-base font-bold text-slate-900">
                            {course.price === 0 ? 'Free' : `$${course.price}`}
                            {course.originalPrice && (
                                <span className="ml-1 text-xs font-normal text-slate-400 line-through">
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