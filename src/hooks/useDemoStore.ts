'use client';

import { useCallback, useEffect, useState } from 'react';
import { Enrollment } from '@/types';

const ENROLL_KEY = 'learnhub:enrollments';
const PROFILE_KEY = 'learnhub:profile';

export interface DemoProfile {
  name: string; email: string; bio: string; avatar: string;
  emailNotifications: boolean; courseReminders: boolean;
}

const DEFAULT_PROFILE: DemoProfile = {
  name: 'Alex Johnson',
  email: 'student@learnhub.demo',
  bio: 'Learning web dev and design.',
  avatar: 'https://i.pravatar.cc/150?img=3',
  emailNotifications: true,
  courseReminders: true,
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? { ...fallback, ...JSON.parse(raw) } as T : fallback;
  } catch { return fallback; }
}

function seed() {
  if (typeof window === 'undefined' || localStorage.getItem(ENROLL_KEY)) return;
  const initial: Enrollment[] = [
    { courseId: 'course-1', enrolledAt: '2024-11-15', completedLessonIds: ['c1-l1', 'c1-l2', 'c1-l3'] },
    { courseId: 'course-2', enrolledAt: '2024-12-01', completedLessonIds: ['c2-l1', 'c2-l2'] },
    { courseId: 'course-6', enrolledAt: '2024-10-20', completedLessonIds: [] },
  ];
  localStorage.setItem(ENROLL_KEY, JSON.stringify(initial));
}

export function useDemoStore() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [profile, setProfile] = useState<DemoProfile>(DEFAULT_PROFILE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    seed();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnrollments(read<Enrollment[]>(ENROLL_KEY, []));
    setProfile(read<DemoProfile>(PROFILE_KEY, DEFAULT_PROFILE));
    setHydrated(true);
  }, []);

  const persist = useCallback((next: Enrollment[]) => {
    setEnrollments(next);
    if (typeof window !== 'undefined') localStorage.setItem(ENROLL_KEY, JSON.stringify(next));
  }, []);

  const isEnrolled = useCallback(
    (id: string) => enrollments.some((e) => e.courseId === id),
    [enrollments]
  );

  const enroll = useCallback((courseId: string) => {
    if (enrollments.some((e) => e.courseId === courseId)) return;
    persist([...enrollments, { courseId, enrolledAt: new Date().toISOString(), completedLessonIds: [] }]);
  }, [enrollments, persist]);

  const unenroll = useCallback((courseId: string) => {
    persist(enrollments.filter((e) => e.courseId !== courseId));
  }, [enrollments, persist]);

  const toggleLesson = useCallback((courseId: string, lessonId: string) => {
    persist(enrollments.map((e) => {
      if (e.courseId !== courseId) return e;
      const has = e.completedLessonIds.includes(lessonId);
      return { ...e, completedLessonIds: has
        ? e.completedLessonIds.filter((id) => id !== lessonId)
        : [...e.completedLessonIds, lessonId] };
    }));
  }, [enrollments, persist]);

  const setLessonComplete = useCallback((courseId: string, lessonId: string, complete: boolean) => {
    persist(enrollments.map((e) => {
      if (e.courseId !== courseId) return e;
      const without = e.completedLessonIds.filter((id) => id !== lessonId);
      return { ...e, completedLessonIds: complete ? [...without, lessonId] : without };
    }));
  }, [enrollments, persist]);

  const updateProfile = useCallback((patch: Partial<DemoProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...patch };
      if (typeof window !== 'undefined') localStorage.setItem(PROFILE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { enrollments, profile, hydrated, isEnrolled, enroll, unenroll, toggleLesson, setLessonComplete, updateProfile };
}