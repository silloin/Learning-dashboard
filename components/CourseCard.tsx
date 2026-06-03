'use client';

import { motion } from 'framer-motion';
import { Course } from '@/types';
import DynamicIcon from './DynamicIcon';
import AnimatedProgressBar from './AnimatedProgressBar';
import { getRandomGradient } from '@/lib/utils';

interface CourseCardProps {
  course: Course;
  index: number;
}

export default function CourseCard({ course, index }: CourseCardProps) {
  const gradient = getRandomGradient(index);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: 'easeOut',
      }}
      whileHover={{
        scale: 1.02,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      className="relative group"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg pointer-events-none`}
      />

      <div className="relative z-10 bg-gray-900/50 backdrop-blur-xl border border-gray-800 hover:border-gray-700 rounded-2xl p-6 transition-colors duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
              <DynamicIcon
                name={course.icon_name}
                size={24}
                className="text-blue-400"
              />
            </div>
            <h3 className="font-semibold text-white text-lg">{course.title}</h3>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-400">Progress</span>
              <span className="text-sm font-semibold text-blue-400">{course.progress}%</span>
            </div>
            <AnimatedProgressBar progress={course.progress} />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
