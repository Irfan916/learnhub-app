'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { cn } from '@/lib/utils/cn';

interface Props {
    className?: string;
}

export function ThemeToggle({ className }: Props) {
    const { theme, toggleTheme, mounted } = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            className={cn(
                'rounded-lg p-2 text-slate-500 transition',
                'hover:bg-slate-100 hover:text-slate-900',
                'dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100',
                className
            )}
        >
            {mounted && isDark ? (
                <Sun className="h-5 w-5" />
            ) : (
                <Moon className="h-5 w-5" />
            )}
        </button>
    );
}