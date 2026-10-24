export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type CourseStatus = 'draft' | 'published' | 'pending';
export type UserRole = 'student' | 'instructor' | 'admin';
export type ThemeMode = 'light' | 'dark';

export interface LessonResource {
  id: string;
  title: string;
  type: 'pdf' | 'code' | 'link' | 'zip';
  size?: string;
  url?: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  description: string;
  isPreview?: boolean;
  resources?: LessonResource[];
}

export interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Instructor {
  id: string;
  slug: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  expertise: string[];
  rating: number;
  reviewCount: number;
  courseCount: number;
  studentCount: number;
}

export interface Review {
  id: string;
  courseId: string;
  studentName: string;
  studentAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  thumbnail: string;
  previewVideo: string;
  instructorId: string;
  category: string;
  tags: string[];
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  enrollmentCount: number;
  difficulty: Difficulty;
  duration: string;
  language: string;
  learningOutcomes: string[];
  prerequisites: string[];
  targetAudience: string[];
  curriculum: Section[];
  publishedAt: string;
  status: CourseStatus;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  courseCount: number;
}

export interface Enrollment {
  courseId: string;
  enrolledAt: string;
  completedLessonIds: string[];
}

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export interface CourseFilters {
  search?: string;
  categories?: string[];
  price?: 'free' | 'paid';
  rating?: number;
  difficulty?: Difficulty[];
  sortBy?: 'popular' | 'newest' | 'price-low' | 'price-high' | 'rating';
  page?: number;
  limit?: number;
}