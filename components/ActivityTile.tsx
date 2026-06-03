'use client';

import { motion } from 'framer-motion';

interface ActivityTileProps {
  index: number;
}

export default function ActivityTile({ index }: ActivityTileProps) {
  const weeks = Array.from({ length: 13 });
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getActivityLevel = (seed: number) => {
    const levels = [0, 1, 2, 3, 4];
    return levels[seed % levels.length];
  };

  const getActivityColor = (level: number): string => {
    const colors = [
      'bg-gray-700',
      'bg-green-900',
      'bg-green-700',
      'bg-green-500',
      'bg-green-400',
    ];
    return colors[level];
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: 'easeOut',
      }}
      whileHover={{ scale: 1.02 }}
      className="relative group md:col-span-2"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-emerald-500/20 to-teal-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg pointer-events-none" />

      <div className="relative z-10 bg-gray-900/50 backdrop-blur-xl border border-gray-800 hover:border-gray-700 rounded-2xl p-6 transition-colors duration-300">
        <h3 className="font-semibold text-white text-lg mb-6">Activity</h3>

        <div className="space-y-2">
          {days.slice(0, 5).map((day, dayIndex) => (
            <div key={day} className="flex items-center gap-2">
              <span className="text-xs text-gray-400 w-8">{day}</span>

              <div className="flex gap-1">
                {weeks.map((_, weekIndex) => (
                  <motion.div
                    key={weekIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: weekIndex * 0.02 + dayIndex * 0.01 }}
                    className={`w-3 h-3 rounded-sm ${getActivityColor(getActivityLevel(weekIndex + index))} transition-colors duration-300`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
          <span>Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <div key={level} className={`w-2 h-2 rounded-sm ${getActivityColor(level)}`} />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </motion.article>
  );
}
