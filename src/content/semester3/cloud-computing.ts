import { semester3Subjects } from "@/data/semester3/subjects";

export const cloudComputingSyllabus = semester3Subjects.find(
  (subject) => subject.id === "cloud-computing",
);
