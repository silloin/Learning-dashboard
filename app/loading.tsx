import { LoadingSkeleton } from '@/components/loading-skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="md:ml-64 p-4 md:p-8">
        <LoadingSkeleton />
      </div>
    </div>
  );
}
