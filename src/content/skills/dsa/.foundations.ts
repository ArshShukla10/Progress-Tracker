import type { Module } from "@/types/academic";

export const foundationsModule: Module = {
  id: "foundations",

  title: "Programming Foundations",

  description:
    "Master the programming fundamentals required before beginning Data Structures and Algorithms.",

  difficulty: "easy",

  priority: "high",

  estimatedStudyTimeMinutes: 600,

  topics: [
    {
      id: "cpp-java-basics",

      title: "Things to Know in C++ / Java",

      status: "not-started",

      difficulty: "easy",

      priority: "high",

      estimatedStudyTimeMinutes: 120,

      subtopics: [],

    },

    {
      id: "basic-maths",

      title: "Basic Mathematics",

      status: "not-started",

      difficulty: "easy",

      priority: "high",

      estimatedStudyTimeMinutes: 120,

      subtopics: [],
    },

    {
      id: "basic-recursion",

      title: "Basic Recursion",

      status: "not-started",

      difficulty: "easy",

      priority: "high",

      estimatedStudyTimeMinutes: 90,

      subtopics: [],
    },

    {
      id: "basic-hashing",

      title: "Basic Hashing",

      status: "not-started",

      difficulty: "easy",

      priority: "medium",

      estimatedStudyTimeMinutes: 90,

      subtopics: [],
    },

    {
      id: "pattern-problems",

      title: "Pattern Problems",

      status: "not-started",

      difficulty: "easy",

      priority: "medium",

      estimatedStudyTimeMinutes: 180,

      subtopics: [],
    },
  ],

  practice: [
    {
      id: "foundations-practice",

      title: "Programming Foundations Practice",

      type: "coding-practice",

      status: "not-started",
    },
  ],
};