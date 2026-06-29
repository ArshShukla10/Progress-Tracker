import { semester3Subjects } from "@/data/semester3/subjects";

export const computerGraphicsSyllabus = semester3Subjects.find(
  (subject) => subject.id === "computer-graphics",
);
