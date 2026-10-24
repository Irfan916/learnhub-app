'use client';

import { CheckCircle2, Lock, PlayCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Course } from '@/types';
import { cn } from '@/lib/utils/cn';

interface Props {
  course: Course;
  currentLessonId?: string;
  completedLessonIds: string[];
  onSelect: (lessonId: string) => void;
}

export function CourseCurriculum({ course, currentLessonId, completedLessonIds, onSelect }: Props) {
  const [openSections, setOpenSections] = useState<string[]>(
    course.curriculum.map((s) => s.id)
  );

  const toggle = (id: string) =>
    setOpenSections((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  return (
    <div className="space-y-3">
      {course.curriculum.map((section) => (
        <div key={section.id} className="overflow-hidden rounded-lg border border-slate-200">
          <button
            onClick={() => toggle(section.id)}
            className="flex w-full items-center justify-between bg-slate-50 px-4 py-3 text-left"
          >
            <div>
              <h4 className="text-sm font-semibold text-slate-900">{section.title}</h4>
              <p className="text-xs text-slate-500">{section.lessons.length} lessons</p>
            </div>
            <ChevronDown className={cn('h-4 w-4 text-slate-400 transition',
              openSections.includes(section.id) && 'rotate-180')} />
          </button>
          {openSections.includes(section.id) && (
            <ul className="divide-y divide-slate-100">
              {section.lessons.map((lesson) => {
                const done = completedLessonIds.includes(lesson.id);
                const current = currentLessonId === lesson.id;
                return (
                  <li key={lesson.id}>
                    <button
                      onClick={() => onSelect(lesson.id)}
                      className={cn(
                        'flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition',
                        current ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-slate-50'
                      )}
                    >
                      {done ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                      ) : lesson.isPreview ? (
                        <PlayCircle className="h-4 w-4 shrink-0 text-slate-400" />
                      ) : (
                        <Lock className="h-4 w-4 shrink-0 text-slate-300" />
                      )}
                      <span className="flex-1 truncate">{lesson.title}</span>
                      <span className="text-xs text-slate-400">{lesson.duration}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}