import { courses } from "@/lib/mock-data";
import { Lecture } from "@/features/lectures/types";

export const lecturesService = {
  getAll(): Lecture[] {
    return courses;
  },

  getById(id: string): Lecture | undefined {
    return courses.find((c) => c.id === id);
  },

  getByCategory(category: string): Lecture[] {
    if (category === "all") return courses;
    return courses.filter((c) => c.category === category);
  },

  getByDifficulty(level: string): Lecture[] {
    if (level === "all") return courses;
    return courses.filter((c) => c.difficulty === level);
  },

  search(keyword: string): Lecture[] {
    const key = keyword.toLowerCase();
    return courses.filter((c) => c.title.toLowerCase().includes(key));
  },
};
