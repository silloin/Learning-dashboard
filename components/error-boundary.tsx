'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorBoundaryProps {
  error: Error;
  reset: () => void;
}

export function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="flex justify-center mb-4">
          <AlertCircle size={64} className="text-red-400" />
        </div>
        <h1 className="text-2xl font-bold text-white">Something went wrong</h1>
        <p className="text-slate-400 max-w-md">
          {error.message || 'Failed to fetch data. Please try again.'}
        </p>
        <button
          onClick={reset}
          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
