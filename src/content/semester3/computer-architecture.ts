import { semester3Subjects } from "@/data/semester3/subjects";

export const computerArchitectureSyllabus = semester3Subjects.find(
  (subject) => subject.id === "computer-architecture",
);
