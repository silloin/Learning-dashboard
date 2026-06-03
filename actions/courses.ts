'use server';

import { createClient } from '@/lib/supabase/server';
import { Course } from '@/types';

export async function fetchCourses(): Promise<{
  data: Course[] | null;
  error: string | null;
}> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('courses')
      .select('id, title, progress, icon_name, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return { data: null, error: error.message };
    }

    return { data: data || [], error: null };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
    console.error('Error fetching courses:', errorMessage);
    return { data: null, error: errorMessage };
  }
}

export async function fetchUserName(): Promise<{
  name: string;
  error: string | null;
}> {
  try {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError) {
      console.error('Auth error:', authError);
      return { name: 'Learner', error: null };
    }

    if (!user) {
      return { name: 'Learner', error: null };
    }

    const name = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Learner';
    return { name, error: null };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
    console.error('Error fetching user:', errorMessage);
    return { name: 'Learner', error: null };
  }
}
