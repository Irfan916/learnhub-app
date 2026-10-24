import { ReactNode } from 'react';
import { Card } from '@/components/ui/Card';

export function StatCard({ label, value, icon }: {
  label: string; value: string | number; icon?: ReactNode;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600">{label}</p>
        {icon && <div className="text-indigo-600">{icon}</div>}
      </div>
      <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
    </Card>
  );
}