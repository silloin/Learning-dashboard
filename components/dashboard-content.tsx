'use client';

import { fetchCourses } from '@/lib/actions';
import { BentoGrid } from '@/components/bento-grid';
import { HeroTile } from '@/components/hero-tile';
import { ActivityTile } from '@/components/activity-tile';
import { useEffect, useState } from 'react';
import type { Course } from '@/types/course';

export function DashboardContent() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCourses();
        setCourses(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch courses'));
      } finally {
        setIsLoading(false);
      }
    };

    loadCourses();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-white">Error loading dashboard</h1>
          <p className="text-slate-400">add supabase</p>
        </div>
      </div>
    );
  }

  return (
    <BentoGrid
      courses={courses}
      heroElement={<HeroTile username="Student" streak={7} />}
      activityElement={<ActivityTile />}
    />
  );
}
