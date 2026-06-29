import type { Semester } from "@/types/academic";

import { semester2Subjects } from "./subjects";

export const semester2: Semester = {
  id: "semester-2",
  number: 2,
  title: "Semester II",
  subjects: semester2Subjects,
};
