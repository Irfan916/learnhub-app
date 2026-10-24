import Link from 'next/link';
import { Search, Star, CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CourseGrid } from '@/components/courses/CourseGrid';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { courses } from '@/data/courses';
import { categories } from '@/data/categories';
import { instructors } from '@/data/instructors';
import Image from 'next/image';

export default function HomePage() {
  const popular = courses.slice(0, 4);
  const featured = instructors.slice(0, 4);

  return (
    <div>
      <Navbar />

      <section className="bg-linear-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
              Learn at your own pace
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Upgrade Your Skills with <span className="text-indigo-600">Expert-Led</span> Courses
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Join thousands of learners and gain new skills with our high-quality online courses. Start today!
            </p>
            <form action="/courses" className="mt-6 flex max-w-md gap-2">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input name="q" placeholder="Search for courses..."
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-indigo-100" />
              </div>
              <Button type="submit" size="lg">Search</Button>
            </form>
            <div className="mt-6 flex items-center gap-6 text-sm text-slate-600">
              <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Lifetime access</span>
              <span className="flex items-center gap-1"><Star className="h-4 w-4 text-amber-400" /> 4.8 avg rating</span>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
              alt="Student learning"
              width={800}
              height={600}
              className="rounded-2xl shadow-xl" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Popular Courses</h2>
            <p className="mt-1 text-sm text-slate-600">Explore our most popular courses and start learning today.</p>
          </div>
          <Link href="/courses" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View all →</Link>
        </div>
        <CourseGrid courses={popular} />
      </section>

      <section className="bg-slate-50 py-16 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900">Browse by Category</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/courses?category=${cat.name}`}>
                <Card className="p-5 text-center transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
                    <span className="text-lg font-bold">{cat.name[0]}</span>
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-slate-900">{cat.name}</h3>
                  <p className="text-xs text-slate-500">{cat.courseCount} courses</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900">Featured Instructors</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((inst) => (
            <Card key={inst.id} className="p-5 text-center">
              <Image src={inst.avatar} alt={inst.name}
                width={100}
                height={100} className="mx-auto h-16 w-16 rounded-full" />
              <h3 className="mt-3 font-semibold text-slate-900">{inst.name}</h3>
              <p className="text-xs text-slate-500">{inst.title}</p>
              <div className="mt-2 flex items-center justify-center gap-1 text-xs text-slate-600">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                {inst.rating} · {inst.courseCount} courses
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="rounded-2xl bg-indigo-600 px-8 py-12 text-center text-white">
          <h2 className="text-3xl font-bold">Start learning today</h2>
          <p className="mt-2 text-indigo-100">Get unlimited access to all courses and start building your future.</p>
          <Link href="/courses" className="mt-6 inline-block">
            <Button variant="secondary" size="lg">Browse Courses</Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}