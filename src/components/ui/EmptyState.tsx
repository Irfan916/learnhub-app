import { ReactNode } from 'react';

interface Props {
    icon?: ReactNode;
    title: string;
    description?: string;
    action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: Props) {
    return (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900/50">
            {icon && <div className="mb-3 text-slate-400 dark:text-slate-500">{icon}</div>}
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                {title}
            </h3>
            {description && (
                <p className="mt-1 max-w-sm text-sm text-slate-600 dark:text-slate-400">
                    {description}
                </p>
            )}
            {action && <div className="mt-4">{action}</div>}
        </div>
    );
}