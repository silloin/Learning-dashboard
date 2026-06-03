import { Suspense } from 'react';
import BentoGrid from '@/components/BentoGrid';
import CourseCard from '@/components/CourseCard';
import HeroTile from '@/components/HeroTile';
import ActivityTile from '@/components/ActivityTile';
import LoadingSkeletons from '@/components/LoadingSkeletons';
import ErrorBoundary from '@/components/ErrorBoundary';
import { fetchCourses, fetchUserName } from '@/actions/courses';

async function CoursesContent() {
  const { data: courses, error: coursesError } = await fetchCourses();
  const { name: username } = await fetchUserName();

  if (coursesError) {
    return <ErrorBoundary error={coursesError} />;
  }

  return (
    <BentoGrid>
      <HeroTile index={0} username={username} />
      <ActivityTile index={1} />
      {courses?.map((course, index) => (
        <CourseCard key={course.id} course={course} index={index + 2} />
      ))}
    </BentoGrid>
  );
}

export default function DashboardPage() {
  return (
    <div className="p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Your learning progress and achievements</p>
        </div>

        <Suspense fallback={<LoadingSkeletons count={6} />}>
          <CoursesContent />
        </Suspense>
      </div>
    </div>
  );
}