import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, Star } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CourseDetailHeader } from '@/components/courses/CourseDetailHeader';
import { CourseCurriculum } from '@/components/player/CourseCurriculum';
import { CourseGrid } from '@/components/courses/CourseGrid';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { courses } from '@/data/courses';
import { instructors } from '@/data/instructors';
import { reviews } from '@/data/reviews';

interface Params {
  slug: string;
}

export default function CourseDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  return (
    <div>
      <Navbar />
      
      <Suspense fallback={<CourseDetailSkeleton />}>
        <CourseDetailContent params={params} />
      </Suspense>
      
      <Footer />
    </div>
  );
}

async function CourseDetailContent({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();

  const instructor = instructors.find((i) => i.id === course.instructorId);
  const courseReviews = reviews.filter((r) => r.courseId === course.id).slice(0, 3);
  const related = courses
    .filter((c) => c.id !== course.id && c.category === course.category)
    .slice(0, 3);

  const totalLessons = course.curriculum.reduce((n, s) => n + s.lessons.length, 0);

  return (
    <div>
      <CourseDetailHeader course={course} />

      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-10">
            {/* What you'll learn */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                What you&apos;ll learn
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {course.learningOutcomes.map((o) => (
                  <div
                    key={o}
                    className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span>{o}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* About */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                About this course
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {course.longDescription}
              </p>
            </section>

            {/* Prerequisites / Audience */}
            <section className="grid gap-6 sm:grid-cols-2">
              <Card className="p-5">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Prerequisites
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  {course.prerequisites.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Card>
              <Card className="p-5">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Who this is for
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  {course.targetAudience.map((a) => (
                    <li key={a} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                      {a}
                    </li>
                  ))}
                </ul>
              </Card>
            </section>

            {/* Curriculum */}
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Curriculum
                </h2>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {course.curriculum.length} sections · {totalLessons} lessons
                </span>
              </div>
              <CourseCurriculum
                course={course}
                completedLessonIds={[]}
                unlocked
              />
            </section>

            {/* Instructor */}
            {instructor && (
              <section>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Your instructor
                </h2>
                <Card className="mt-4 p-6">
                  <div className="flex gap-4">
                    <Image
                      src={instructor.avatar}
                      alt={instructor.name}
                      width={100}
                      height={100}
                      className="h-16 w-16 shrink-0 rounded-full"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {instructor.name}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {instructor.title}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-600 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          {instructor.rating} instructor rating
                        </span>
                        <span>{instructor.courseCount} courses</span>
                        <span>
                          {(instructor.studentCount / 1000).toFixed(0)}k students
                        </span>
                      </div>
                      <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                        {instructor.bio}
                      </p>
                    </div>
                  </div>
                </Card>
              </section>
            )}

            {/* Reviews */}
            {courseReviews.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Reviews
                </h2>
                <div className="mt-4 space-y-4">
                  {courseReviews.map((r) => (
                    <Card key={r.id} className="p-5">
                      <div className="flex items-start gap-3">
                        <Image
                          src={r.studentAvatar}
                          alt={r.studentName}
                          width={100}
                          height={100}
                          className="h-10 w-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-slate-900 dark:text-slate-100">
                              {r.studentName}
                            </p>
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: r.rating }).map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                                />
                              ))}
                            </div>
                          </div>
                          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                            {r.comment}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="hidden lg:block" />
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Related courses
            </h2>
            <div className="mt-6">
              <CourseGrid courses={related} columns={3} />
            </div>
          </section>
        )}
      </div>

    </div>
  );
}

function CourseDetailSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <Skeleton className="h-96 w-full" />
    </div>
  );
}