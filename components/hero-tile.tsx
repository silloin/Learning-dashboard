'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

interface HeroTileProps {
  username: string;
  streak: number;
}

export function HeroTile({ username, streak }: HeroTileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0, duration: 0.5, ease: 'easeOut' }}
      whileHover={{
        scale: 1.02,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      className="relative h-full rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 overflow-hidden backdrop-blur-sm hover:border-slate-600 transition-colors cursor-pointer"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 group-hover:blur-xl transition-all duration-300" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-8 z-10">
        <div>
          <p className="text-slate-400 text-sm font-medium mb-2">Welcome back</p>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {username}
          </h1>
        </div>

        {/* Streak Indicator */}
        <div className="flex items-center gap-3 bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/10">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Flame className="text-orange-400" size={32} />
          </motion.div>
          <div>
            <p className="text-slate-400 text-sm">Learning Streak</p>
            <p className="text-2xl font-bold text-white">{streak} days</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
