import { Suspense } from 'react';
import LearnPlayer from './LearnPlayer';

export default function LearnPage({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading player…</div>}>
      <LearnPlayer params={params} />
    </Suspense>
  );
}