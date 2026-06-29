import type { Semester } from "@/types/academic";

import { semester1Subjects } from "./subjects";

export const semester1: Semester = {
  id: "semester-1",
  number: 1,
  title: "Semester I",
  subjects: semester1Subjects,
};
