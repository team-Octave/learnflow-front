"use server";

import { lecturesService } from "@/services/lectures.service";

export async function fetchCourses() {
  return lecturesService.getAll();
}

export async function fetchCourseDetail(id: string) {
  return lecturesService.getById(id);
}

export async function fetchCategoryCourses(category: string) {
  return lecturesService.getByCategory(category);
}

export async function fetchDifficultyCourses(level: string) {
  return lecturesService.getByDifficulty(level);
}

export async function searchCourses(keyword: string) {
  return lecturesService.search(keyword);
}
