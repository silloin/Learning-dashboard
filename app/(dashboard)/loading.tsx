import LoadingSkeletons from '@/components/LoadingSkeletons';

export default function Loading() {
  return (
    <div className="p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 animate-pulse">
          <div className="h-8 bg-gray-800 rounded w-48 mb-2" />
          <div className="h-4 bg-gray-800 rounded w-96" />
        </div>

        <LoadingSkeletons count={6} />
      </div>
    </div>
  );
}
