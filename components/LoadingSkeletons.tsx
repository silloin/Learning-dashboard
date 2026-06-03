'use client';

import { motion } from 'framer-motion';

interface LoadingSkeletonsProps {
  count?: number;
}

export default function LoadingSkeletons({ count = 5 }: LoadingSkeletonsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.1,
          }}
          className="h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700"
        />
      ))}
    </div>
  );
}
