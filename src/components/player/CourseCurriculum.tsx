'use client';

import { useState } from 'react';
import { CheckCircle2, Lock, PlayCircle, ChevronDown } from 'lucide-react';
import { Course } from '@/types';
import { cn } from '@/lib/utils/cn';

interface Props {
    course: Course;
    currentLessonId?: string;
    completedLessonIds: string[];
    onSelect?: (lessonId: string) => void;
    unlocked?: boolean;
}

export function CourseCurriculum({
    course,
    currentLessonId,
    completedLessonIds,
    onSelect,
    unlocked = true,
}: Props) {
    const [openSections, setOpenSections] = useState<string[]>(
        course.curriculum.map((s) => s.id)
    );

    const toggle = (id: string) =>
        setOpenSections((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );

    return (
        <div className="space-y-3">
            {course.curriculum.map((section) => (
                <div
                    key={section.id}
                    className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800"
                >
                    <button
                        onClick={() => toggle(section.id)}
                        className="flex w-full items-center justify-between bg-slate-50 px-4 py-3 text-left dark:bg-slate-800/50"
                    >
                        <div>
                            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                {section.title}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                {section.lessons.length} lessons
                            </p>
                        </div>
                        <ChevronDown
                            className={cn(
                                'h-4 w-4 text-slate-400 transition',
                                openSections.includes(section.id) && 'rotate-180'
                            )}
                        />
                    </button>
                    {openSections.includes(section.id) && (
                        <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                            {section.lessons.map((lesson) => {
                                const done = completedLessonIds.includes(lesson.id);
                                const current = currentLessonId === lesson.id;
                                const locked = !unlocked && !lesson.isPreview && !done;
                                return (
                                    <li key={lesson.id}>
                                        <button
                                            onClick={() => {
                                                if (!locked) onSelect?.(lesson.id);
                                            }}
                                            disabled={locked}
                                            className={cn(
                                                'flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition',
                                                current
                                                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300'
                                                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/50',
                                                locked && 'cursor-not-allowed opacity-60'
                                            )}
                                        >
                                            {done ? (
                                                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                                            ) : locked ? (
                                                <Lock className="h-4 w-4 shrink-0 text-slate-300 dark:text-slate-600" />
                                            ) : lesson.isPreview ? (
                                                <PlayCircle className="h-4 w-4 shrink-0 text-slate-400" />
                                            ) : (
                                                <PlayCircle className="h-4 w-4 shrink-0 text-slate-500" />
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