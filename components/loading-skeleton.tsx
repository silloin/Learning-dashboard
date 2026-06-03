'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function LoadingSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full space-y-4"
    >
      {/* Hero Skeleton */}
      <div className="grid grid-cols-4 gap-4 auto-rows-[300px]">
        <div className="col-span-2 row-span-2">
          <div className="w-full h-full rounded-xl bg-slate-800/50 overflow-hidden">
            <motion.div
              className="w-full h-full bg-gradient-to-r from-transparent via-slate-700/50 to-transparent"
              animate={{ translateX: ['100%', '-100%'] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>

        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="col-span-1">
            <div className="w-full h-full rounded-xl bg-slate-800/50 overflow-hidden">
              <motion.div
                className="w-full h-full bg-gradient-to-r from-transparent via-slate-700/50 to-transparent"
                animate={{ translateX: ['100%', '-100%'] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
