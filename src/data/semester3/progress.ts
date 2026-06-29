import type { ContinueLearning, StudyTask } from "@/types/academic";

export const semester3StudyTasks: StudyTask[] = [
  {
    id: "mission-ds-linked-list",
    title: "Revise linked list operations",
    subjectId: "data-structures",
    moduleId: "ds-module-1",
    topicId: "ds-linked-lists",
    status: "not-started",
    lastStudiedAt: "Today",
  },
  {
    id: "mission-java-inheritance",
    title: "Practice inheritance and method overriding",
    subjectId: "java-programming",
    moduleId: "java-module-1",
    topicId: "java-inheritance",
    status: "not-started",
    lastStudiedAt: "Yesterday",
  },
  {
    id: "mission-dbms-normalization",
    title: "Review DBMS normalization notes",
    subjectId: "dbms",
    moduleId: "dbms-module-1",
    topicId: "dbms-normalization",
    status: "not-started",
    lastStudiedAt: "2 days ago",
  },
  {
    id: "mission-dsa-recursion",
    title: "Solve recursion dry-run questions",
    subjectId: "dsa-theory",
    moduleId: "dsa-theory-module-1",
    topicId: "dsa-recursion",
    status: "not-started",
    lastStudiedAt: "This week",
  },
];

export const semester3ContinueLearning: ContinueLearning = {
  subjectId: "data-structures",
  moduleId: "ds-module-1",
  topicId: "ds-linked-lists",
};
