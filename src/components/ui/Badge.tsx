import { cn } from '@/lib/utils/cn';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLSpanElement> {
    tone?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

const tones: Record<NonNullable<Props['tone']>, string> = {
    default:
        'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    success:
        'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    warning:
        'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    danger:
        'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
    info:
        'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
};

export function Badge({ tone = 'default', className, ...props }: Props) {
    return (
        <span
            className={cn(
                'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                tones[tone],
                className
            )}
            {...props}
        />
    );
}