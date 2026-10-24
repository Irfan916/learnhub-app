import { cn } from '@/lib/utils/cn';
import { InputHTMLAttributes, forwardRef } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(
    ({ className, label, error, id, ...props }, ref) => (
        <div className="space-y-1">
            {label && (
                <label
                    htmlFor={id}
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                    {label}
                </label>
            )}
            <input
                ref={ref}
                id={id}
                className={cn(
                    'h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none',
                    'dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500',
                    'focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900',
                    error && 'border-red-400 focus:ring-red-100 dark:focus:ring-red-900',
                    className
                )}
                {...props}
            />
            {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
        </div>
    )
);
Input.displayName = 'Input';