'use client';

import { AlertCircle } from 'lucide-react';

interface ErrorBoundaryProps {
  error: string;
  reset?: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  return (
    <div className="flex items-center justify-center min-h-96">
      <div className="bg-red-900/20 border border-red-500/50 rounded-2xl p-8 max-w-md text-center">
        <div className="flex justify-center mb-4">
          <AlertCircle className="w-12 h-12 text-red-400" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">Failed to Load Courses</h3>
        <p className="text-sm text-gray-300 mb-6">{error}</p>
        {reset && (
          <button
            onClick={reset}
            className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-6 py-2 rounded-lg transition-colors duration-200 font-medium"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
