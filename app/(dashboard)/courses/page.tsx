import { Suspense } from 'react';
import CourseCard from '@/components/CourseCard';
import LoadingSkeletons from '@/components/LoadingSkeletons';
import ErrorBoundary from '@/components/ErrorBoundary';
import { fetchCourses } from '@/actions/courses';

async function CoursesList() {
  const { data: courses, error } = await fetchCourses();

  if (error) {
    return <ErrorBoundary error={error} />;
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No courses found. Add seed data to Supabase.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course, index) => (
        <CourseCard key={course.id} course={course} index={index} />
      ))}
    </div>
  );
}

export default function CoursesPage() {
  return (
    <div className="p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">My Courses</h1>
          <p className="text-gray-400">Track and manage your active training programs.</p>
        </div>

        <Suspense fallback={<LoadingSkeletons count={3} />}>
          <CoursesList />
        </Suspense>
      </div>
    </div>
  );
}
