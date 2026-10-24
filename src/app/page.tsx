import Link from 'next/link';
import Image from 'next/image';
import { Search, Star, CheckCircle2, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CourseGrid } from '@/components/courses/CourseGrid';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { courses } from '@/data/courses';
import { categories } from '@/data/categories';
import { instructors } from '@/data/instructors';

export default function HomePage() {
  const popular = courses.filter((c) => c.featured).slice(0, 4);
  const featured = instructors.slice(0, 4);

  return (
    <div>
      <Navbar />

      {/* Hero */}
      <section className="bg-linear-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
              Learn at your own pace
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
              Upgrade Your Skills with{' '}
              <span className="text-indigo-600 dark:text-indigo-400">Expert-Led</span>{' '}
              Courses
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
              Join thousands of learners and gain new skills with our high-quality online
              courses. Start today!
            </p>
            <form action="/courses" className="mt-6 flex max-w-md gap-2">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  name="q"
                  placeholder="Search for courses..."
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-indigo-900"
                />
              </div>
              <Button type="submit" size="lg">
                Search
              </Button>
            </form>
            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Lifetime access
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 text-amber-400" />
                4.8 average rating
              </span>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                alt="Student learning"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -left-4 top-6 rounded-lg bg-white px-3 py-2 shadow-md dark:bg-slate-800">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Trusted by
              </p>
              <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                50,000+ learners
              </p>
            </div>
            <div className="absolute -right-4 bottom-6 rounded-lg bg-white px-3 py-2 shadow-md dark:bg-slate-800">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Average rating
              </p>
              <p className="flex items-center gap-1 text-lg font-bold text-slate-900 dark:text-slate-100">
                4.8 <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular courses */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Popular Courses
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Explore our most popular courses and start learning today.
            </p>
          </div>
          <Link
            href="/courses"
            className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <CourseGrid courses={popular} columns={4} />
      </section>

      {/* Categories */}
      <section className="bg-slate-50 py-16 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Browse by Category
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/courses?category=${cat.name}`}>
                <Card className="p-5 text-center transition hover:-translate-y-0.5 hover:shadow-md">
                  <div
                    className="mx-auto flex h-12 w-12 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: `${cat.color}15`,
                      color: cat.color,
                    }}
                  >
                    <span className="text-lg font-bold">{cat.name[0]}</span>
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {cat.courseCount} courses
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured instructors */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Featured Instructors
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Learn from industry experts with real-world experience.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((inst) => (
            <Card key={inst.id} className="p-5 text-center">
              <Image
                src={inst.avatar}
                alt={inst.name}
                width={100}
                height={100}
                className="mx-auto h-16 w-16 rounded-full"
              />
              <h3 className="mt-3 font-semibold text-slate-900 dark:text-slate-100">
                {inst.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {inst.title}
              </p>
              <div className="mt-2 flex items-center justify-center gap-1 text-xs text-slate-600 dark:text-slate-400">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                {inst.rating} · {inst.courseCount} courses
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="rounded-2xl bg-indigo-600 px-8 py-12 text-center text-white dark:bg-indigo-700">
          <h2 className="text-3xl font-bold">Start learning today</h2>
          <p className="mt-2 text-indigo-100">
            Get unlimited access to all courses and start building your future.
          </p>
          <Link href="/courses" className="mt-6 inline-block">
            <Button variant="secondary" size="lg">
              Browse Courses
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}