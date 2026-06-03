'use client';

import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

interface HeroTileProps {
  index: number;
  username: string;
}

export default function HeroTile({ index, username }: HeroTileProps) {
  const streakDays = 12;

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

      className="relative group md:col-span-2 md:row-span-2"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-orange-500/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg pointer-events-none" />
      <div className="relative z-10 bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-xl border border-gray-800 hover:border-gray-700 rounded-2xl p-8 transition-colors duration-300 h-full flex flex-col justify-between">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Welcome back,
          </h2>
          <p className="text-2xl md:text-3xl font-semibold text-white">{username}</p>
        </div>

        <div className="flex items-center gap-3 pt-8">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500/30 to-red-500/30 rounded-xl flex items-center justify-center">
            <Flame className="w-8 h-8 text-orange-400" />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Learning Streak</p>
            <p className="text-3xl font-bold text-orange-400">{streakDays} days</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
