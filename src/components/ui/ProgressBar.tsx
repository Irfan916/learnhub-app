import { cn } from '@/lib/utils/cn';

interface Props {
    value: number;
    className?: string;
}

export function ProgressBar({ value, className }: Props) {
    const v = Math.min(100, Math.max(0, value));
    return (
        <div
            className={cn(
                'h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800',
                className
            )}
            role="progressbar"
            aria-valuenow={v}
            aria-valuemin={0}
            aria-valuemax={100}
        >
            <div
                className="h-full rounded-full bg-indigo-600 transition-all"
                style={{ width: `${v}%` }}
            />
        </div>
    );
}