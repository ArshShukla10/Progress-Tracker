import { semester3Subjects } from "@/data/semester3/subjects";

export const dataStructuresSyllabus = semester3Subjects.find(
  (subject) => subject.id === "data-structures",
);
