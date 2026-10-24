import { courses } from '@/data/courses';
import { categories } from '@/data/categories';
import { instructors } from '@/data/instructors';
import { reviews } from '@/data/reviews';
import { Course, CourseFilters, Instructor, Review, Category } from '@/types';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const api = {
  async getCourses(filters: CourseFilters = {}): Promise<{ courses: Course[]; total: number }> {
    await delay(300);
    let result = courses.filter((c) => c.status === 'published');

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q)) ||
          instructors.find((i) => i.id === c.instructorId)?.name.toLowerCase().includes(q)
      );
    }
    if (filters.categories?.length) result = result.filter((c) => filters.categories!.includes(c.category));
    if (filters.price === 'free') result = result.filter((c) => c.price === 0);
    if (filters.price === 'paid') result = result.filter((c) => c.price > 0);
    if (filters.rating) result = result.filter((c) => c.rating >= filters.rating!);
    if (filters.difficulty?.length) result = result.filter((c) => filters.difficulty!.includes(c.difficulty));

    switch (filters.sortBy) {
      case 'newest': result = [...result].sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt)); break;
      case 'price-low': result = [...result].sort((a, b) => a.price - b.price); break;
      case 'price-high': result = [...result].sort((a, b) => b.price - a.price); break;
      case 'rating': result = [...result].sort((a, b) => b.rating - a.rating); break;
      default: result = [...result].sort((a, b) => b.enrollmentCount - a.enrollmentCount);
    }

    const total = result.length;
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 8;
    result = result.slice(0, page * limit);

    return { courses: result, total };
  },

  async getCourse(slug: string) {
    await delay(250);
    return courses.find((c) => c.slug === slug);
  },

  async getCourseById(id: string) {
    await delay(150);
    return courses.find((c) => c.id === id);
  },

  async getInstructors() {
    await delay(200);
    return instructors;
  },

  async getInstructor(slug: string) {
    await delay(200);
    return instructors.find((i) => i.slug === slug);
  },

  async getCategories() {
    await delay(150);
    return categories;
  },

  async getReviews(courseId: string) {
    await delay(200);
    return reviews.filter((r) => r.courseId === courseId);
  },

  async getRelatedCourses(courseId: string) {
    await delay(200);
    const course = courses.find((c) => c.id === courseId);
    if (!course) return [];
    return courses.filter((c) => c.id !== courseId && c.category === course.category).slice(0, 3);
  },

  async getFeaturedCourses() {
    await delay(200);
    return courses.filter((c) => c.featured);
  },
};