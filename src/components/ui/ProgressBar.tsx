interface Props { value: number; className?: string; }

export function ProgressBar({ value, className }: Props) {
  const v = Math.min(100, Math.max(0, value));
  return (
    <div className={`h-2 w-full rounded-full bg-slate-200 ${className ?? ''}`}>
      <div className="h-full rounded-full bg-indigo-600 transition-all" style={{ width: `${v}%` }} />
    </div>
  );
}