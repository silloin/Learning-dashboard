'use client';

import { motion } from 'framer-motion';

interface ContributionDay {
  day: string;
  value: number;
}

export function ActivityTile() {
  const contributions: ContributionDay[] = [
    { day: 'Mon', value: 0 },
    { day: 'Tue', value: 1 },
    { day: 'Wed', value: 2 },
    { day: 'Thu', value: 3 },
    { day: 'Fri', value: 0 },
    { day: 'Sat', value: 1 },
    { day: 'Sun', value: 2 },
  ];

  const getIntensityColor = (value: number) => {
    if (value === 0) return 'bg-slate-700/30';
    if (value === 1) return 'bg-green-500/30';
    if (value === 2) return 'bg-green-500/60';
    return 'bg-green-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
      whileHover={{
        scale: 1.02,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      className="relative h-full rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/50 overflow-hidden backdrop-blur-sm hover:border-slate-600 transition-colors cursor-pointer p-6"
    >
      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-white mb-4">Weekly Activity</h3>

        <div className="flex gap-3 items-end justify-center h-32">
          {contributions.map((day, index) => (
            <motion.div
              key={day.day}
              initial={{ height: 0 }}
              animate={{ height: `${20 + day.value * 20}px` }}
              transition={{
                delay: 0.5 + index * 0.05,
                duration: 0.6,
                ease: 'easeOut',
              }}
              className="flex flex-col items-center gap-2 flex-1"
            >
              <div
                className={`w-full rounded-sm transition-all hover:opacity-80 ${getIntensityColor(
                  day.value
                )}`}
              />
              <span className="text-xs text-slate-400 font-medium">{day.day}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-3 text-xs text-slate-400">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-slate-700/30" />
            <div className="w-3 h-3 rounded-sm bg-green-500/30" />
            <div className="w-3 h-3 rounded-sm bg-green-500/60" />
            <div className="w-3 h-3 rounded-sm bg-green-500" />
          </div>
          <span>More</span>
        </div>
      </div>
    </motion.div>
  );
}

