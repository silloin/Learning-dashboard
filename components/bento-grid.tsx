'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Course } from '@/types/course';
import { CourseCard } from './course-card';

interface BentoGridProps {
  courses: Course[];
  heroElement: React.ReactNode;
  activityElement: React.ReactNode;
}

export function BentoGrid({ courses, heroElement, activityElement }: BentoGridProps) {
  return (
    <div className="w-full">
      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-4 gap-4 auto-rows-[300px]">
        {/* Hero Tile - Large (2x2) */}
        <div className="col-span-2 row-span-2">
          {heroElement}
        </div>

        {/* Course Tiles */}
        {courses.slice(0, 4).map((course, index) => (
          <div key={course.id} className="col-span-1">
            <CourseCard course={course} index={index + 2} />
          </div>
        ))}

        {/* Activity Tile (spans if courses < 4) */}
        {courses.length < 4 && (
          <div className={cn(
            courses.length === 2 ? 'col-span-2' : 'col-span-1'
          )}>
            {activityElement}
          </div>
        )}
      </div>

      {/* Tablet Grid */}
      <div className="hidden sm:grid md:hidden grid-cols-2 gap-4 auto-rows-[250px]">
        {/* Hero Tile - Stacked */}
        <div className="col-span-2">
          {heroElement}
        </div>

        {/* Course Tiles */}
        {courses.map((course, index) => (
          <div key={course.id} className="col-span-1">
            <CourseCard course={course} index={index + 1} />
          </div>
        ))}

        {/* Activity Tile */}
        <div className="col-span-2">
          {activityElement}
        </div>
      </div>

      {/* Mobile Grid */}
      <div className="sm:hidden grid grid-cols-1 gap-4 auto-rows-[200px]">
        {/* Hero Tile */}
        <div>
          {heroElement}
        </div>

        {/* Course Tiles */}
        {courses.map((course, index) => (
          <div key={course.id}>
            <CourseCard course={course} index={index} />
          </div>
        ))}

        {/* Activity Tile */}
        <div>
          {activityElement}
        </div>
      </div>
    </div>
  );
}
