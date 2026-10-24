import { cn } from '@/lib/utils/cn';
import { ButtonHTMLAttributes, forwardRef } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
}

const variants: Record<Variant, string> = {
    primary:
        'bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-300 dark:disabled:bg-indigo-900',
    secondary:
        'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 ' +
        'dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-800',
    ghost:
        'text-slate-700 hover:bg-slate-100 ' +
        'dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white',
    danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300',
};

const sizes: Record<Size, string> = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
};

export const Button = forwardRef<HTMLButtonElement, Props>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => (
        <button
            ref={ref}
            className={cn(
                'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition disabled:cursor-not-allowed',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        />
    )
);
Button.displayName = 'Button';