'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedProgressBarProps {
  progress: number;
  className?: string;
}

export default function AnimatedProgressBar({
  progress,
  className = '',
}: AnimatedProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isInView]);

  return (
    <div
      ref={ref}
      className={`relative h-2 bg-gray-700 rounded-full overflow-hidden ${className}`}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: `${progress}%` } : { width: 0 }}
        transition={{
          duration: 1.2,
          ease: 'easeOut',
        }}
        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
      />
    </div>
  );
}
