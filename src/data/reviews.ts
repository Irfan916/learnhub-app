import { Review } from '@/types';

const comments = [
  'Fantastic course! Clear explanations and useful projects.',
  'Enjoyed the pacing. Built my own project in weeks.',
  'Great content, wish there were more quizzes.',
  'Exactly what I needed to level up.',
  'Clear, practical, well structured.',
  'Solid course, a couple of sections felt rushed.',
];

export const reviews: Review[] = Array.from({ length: 36 }, (_, i) => ({
  id: `review-${i + 1}`,
  courseId: `course-${(i % 12) + 1}`,
  studentName: ['Alex Johnson', 'Maria Garcia', 'Sam Lee', 'Priya Patel', 'Tom Brown', 'Yuki Tanaka'][i % 6],
  studentAvatar: `https://i.pravatar.cc/100?img=${(i % 60) + 1}`,
  rating: [5, 4, 5, 5, 4, 5][i % 6],
  comment: comments[i % comments.length],
  date: `2024-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 27) + 1).padStart(2, '0')}`,
}));