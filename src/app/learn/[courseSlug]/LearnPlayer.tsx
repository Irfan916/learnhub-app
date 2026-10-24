'use client';

import { use, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    FileText,
    MessageSquare,
    NotebookPen,
    Download,
    BookOpen,
} from 'lucide-react';
import { VideoPlayer } from '@/components/player/VideoPlayer';
import { CourseCurriculum } from '@/components/player/CourseCurriculum';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { courses } from '@/data/courses';
import { useDemoStore } from '@/hooks/useDemoStore';
import { toast } from 'react-toastify';
import { cn } from '@/lib/utils/cn';


type Tab = 'overview' | 'notes' | 'discussion';

export default function LearnPage({ params }: { params: Promise<{ courseSlug: string }> }) {
    const { courseSlug } = use(params);
    const course = courses.find((c) => c.slug === courseSlug);
    const router = useRouter();
    const { enrollments, isEnrolled, enroll, setLessonComplete, hydrated } = useDemoStore();

    const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);
    const [tab, setTab] = useState<Tab>('overview');
    const [notes, setNotes] = useState('');

    const flatLessons = useMemo(
        () => course?.curriculum.flatMap((s) => s.lessons) ?? [],
        [course]
    );

    const enrollment = enrollments.find((e) => e.courseId === course?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const completedIds = enrollment?.completedLessonIds ?? [];

    // Redirect if not enrolled
    useEffect(() => {
        if (!hydrated || !course) return;
        if (!isEnrolled(course.id)) {
            toast.info('Enroll first to access the course player.');
            router.replace(`/courses/${course.slug}`);
        }
    }, [hydrated, course, isEnrolled, router]);

    // Set first lesson as default
    useEffect(() => {
        if (flatLessons.length && !currentLessonId) {
            const firstIncomplete =
                flatLessons.find((l) => !completedIds.includes(l.id)) ?? flatLessons[0];
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setCurrentLessonId(firstIncomplete.id);
        }
    }, [flatLessons, currentLessonId, completedIds]);

    if (!course) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Skeleton className="h-64 w-full max-w-md" />
            </div>
        );
    }

    const currentIndex = flatLessons.findIndex((l) => l.id === currentLessonId);
    const currentLesson = flatLessons[currentIndex];
    const prevLesson = currentIndex > 0 ? flatLessons[currentIndex - 1] : null;
    const nextLesson =
        currentIndex >= 0 && currentIndex < flatLessons.length - 1
            ? flatLessons[currentIndex + 1]
            : null;
    const progress =
        flatLessons.length > 0 ? (completedIds.length / flatLessons.length) * 100 : 0;
    const isComplete = currentLesson && completedIds.includes(currentLesson.id);

    const toggleComplete = () => {
        if (!currentLesson) return;
        setLessonComplete(course.id, currentLesson.id, !isComplete);
        toast.success(isComplete ? 'Marked as incomplete' : 'Lesson completed');
    };

    if (!isEnrolled(course.id)) {
        return null; // will redirect
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Top bar */}
            <div className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 lg:px-8">
                    <Link
                        href={`/courses/${course.slug}`}
                        className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to course
                    </Link>
                    <div className="ml-auto flex items-center gap-3 text-sm">
                        <span className="text-slate-600 dark:text-slate-400">
                            {completedIds.length}/{flatLessons.length} lessons
                        </span>
                        <div className="w-32">
                            <ProgressBar value={progress} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[1fr_360px] lg:px-8">
                {/* Main */}
                <div className="space-y-6">
                    {currentLesson && (
                        <>
                            <VideoPlayer src={currentLesson.videoUrl} poster={course.thumbnail} />

                            <div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <Badge tone={isComplete ? 'success' : 'info'}>
                                        {isComplete ? 'Completed' : 'In progress'}
                                    </Badge>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                        Lesson {currentIndex + 1} of {flatLessons.length}
                                    </span>
                                </div>
                                <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
                                    {currentLesson.title}
                                </h1>
                                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                    {currentLesson.description}
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div className="flex gap-2">
                                    <Button
                                        variant="secondary"
                                        disabled={!prevLesson}
                                        onClick={() => prevLesson && setCurrentLessonId(prevLesson.id)}
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                        Previous
                                    </Button>
                                    <Button
                                        variant={isComplete ? 'secondary' : 'primary'}
                                        onClick={toggleComplete}
                                    >
                                        <CheckCircle2 className="h-4 w-4" />
                                        {isComplete ? 'Mark as Incomplete' : 'Mark as Complete'}
                                    </Button>
                                    <Button
                                        disabled={!nextLesson}
                                        onClick={() => nextLesson && setCurrentLessonId(nextLesson.id)}
                                    >
                                        Next
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Tabs */}
                            <Card>
                                <div className="flex border-b border-slate-200 dark:border-slate-800">
                                    {(
                                        [
                                            { id: 'overview', label: 'Resources', icon: FileText },
                                            { id: 'notes', label: 'Notes', icon: NotebookPen },
                                            { id: 'discussion', label: 'Discussion', icon: MessageSquare },
                                        ] as const
                                    ).map((t) => {
                                        const Icon = t.icon;
                                        return (
                                            <button
                                                key={t.id}
                                                onClick={() => setTab(t.id)}
                                                className={cn(
                                                    'flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition',
                                                    tab === t.id
                                                        ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                                                        : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                                                )}
                                            >
                                                <Icon className="h-4 w-4" />
                                                {t.label}
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="p-5">
                                    {tab === 'overview' && (
                                        <div>
                                            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                                Lesson resources
                                            </h3>
                                            {currentLesson.resources?.length ? (
                                                <ul className="mt-3 space-y-2">
                                                    {currentLesson.resources.map((r) => (
                                                        <li
                                                            key={r.id}
                                                            className="flex items-center justify-between rounded-lg border border-slate-200 p-3 text-sm dark:border-slate-800"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <FileText className="h-4 w-4 text-slate-400" />
                                                                <span className="text-slate-700 dark:text-slate-300">
                                                                    {r.title}
                                                                </span>
                                                                <Badge tone="default">{r.type.toUpperCase()}</Badge>
                                                                {r.size && (
                                                                    <span className="text-xs text-slate-400">
                                                                        {r.size}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <Button variant="ghost" size="sm" disabled>
                                                                <Download className="h-4 w-4" />
                                                                Demo only
                                                            </Button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                                    No resources for this lesson.
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {tab === 'notes' && (
                                        <div>
                                            <label className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                                Your notes (saved locally in this session)
                                            </label>
                                            <textarea
                                                value={notes}
                                                onChange={(e) => setNotes(e.target.value)}
                                                placeholder="Write your notes here..."
                                                rows={6}
                                                className="mt-2 w-full rounded-lg border border-slate-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                            />
                                            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                                                Notes are not persisted in this demo.
                                            </p>
                                        </div>
                                    )}

                                    {tab === 'discussion' && (
                                        <div>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                                Discussion is disabled in this demo. In the full version,
                                                students can ask questions and instructors can reply here.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </>
                    )}
                </div>

                {/* Sidebar */}
                <aside className="space-y-4">
                    <Card className="p-4">
                        <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                            <h2 className="font-semibold text-slate-900 dark:text-slate-100">
                                Course content
                            </h2>
                        </div>
                        <div className="mt-3">
                            <CourseCurriculum
                                course={course}
                                currentLessonId={currentLessonId ?? undefined}
                                completedLessonIds={completedIds}
                                onSelect={setCurrentLessonId}
                            />
                        </div>
                    </Card>
                </aside>
            </div>
        </div>
    );
}