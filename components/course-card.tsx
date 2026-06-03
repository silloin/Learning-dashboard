'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Course } from '@/types/course';
import DynamicIcon from './DynamicIcon';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  course: Course;
  index: number;
}

const gradients = [
  'from-blue-500/30 via-purple-500/20 to-pink-500/10',
  'from-purple-500/30 via-pink-500/20 to-red-500/10',
  'from-green-500/30 via-emerald-500/20 to-teal-500/10',
  'from-orange-500/30 via-red-500/20 to-pink-500/10',
];

export function CourseCard({ course, index }: CourseCardProps) {
  const [displayProgress, setDisplayProgress] = useState(0);
  const gradient = gradients[index % gradients.length];

  useEffect(() => {
    let raf: number | undefined;

    const timeout = window.setTimeout(() => {

      const start = performance.now();
      const from = displayProgress;
      const to = course.progress;
      const durationMs = 1200;

      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / durationMs);
        const eased = 1 - Math.pow(1 - t, 3);
        const next = from + (to - from) * eased;
        setDisplayProgress(next);

        if (t < 1) {
          raf = window.requestAnimationFrame(tick);
        }
      };

      raf = window.requestAnimationFrame(tick);
    }, 500 + index * 100);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      if (timeout) window.clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course.progress, index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      }}
      whileHover={{
        scale: 1.02,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      className={cn(
        'group relative h-full rounded-xl border border-slate-700/50 bg-gradient-to-br',
        gradient,
        'overflow-hidden backdrop-blur-sm hover:border-slate-600 transition-colors cursor-pointer'
      )}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl" />
      </div>

      <div className="relative h-full flex flex-col justify-between p-6 z-10">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
              {course.title}
            </h3>
          </div>
          <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors">
            <DynamicIcon name={course.icon_name} size={24} className="text-white" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-300">Progress</span>
            <span className="font-semibold text-white">{Math.round(displayProgress)}%</span>
          </div>

          <div className="relative h-2 bg-slate-700/50 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${displayProgress}%` }}
              transition={{
                delay: 0.5 + index * 0.1,
                duration: 1.5,
                ease: 'easeOut',
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

