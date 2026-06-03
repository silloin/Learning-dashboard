"use server";

import { supabase } from "./supabase";
import type { Course } from "@/types/course";

export async function fetchCourses(): Promise<Course[]> {
  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Supabase error:", error);
      throw new Error("Failed to fetch courses");
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
}
