import type { Module } from "@/types/academic";

export const recursionModule: Module = {
  id: "recursion",

  title: "Recursion",

  description:
    "Learn recursive thinking and recursive problem solving.",

  difficulty: "medium",

  priority: "high",

  estimatedStudyTimeMinutes: 480,

  topics: [
    {
      id: "introduction-recursion",
      title: "Introduction to Recursion",
      status: "not-started",
      difficulty: "easy",
      priority: "high",
      estimatedStudyTimeMinutes: 45,
      subtopics: [],
    },
    {
      id: "print-n-times",
      title: "Print N Times",
      status: "not-started",
      difficulty: "easy",
      priority: "medium",
      estimatedStudyTimeMinutes: 30,
      subtopics: [],
    },
    {
      id: "parameterized-recursion",
      title: "Parameterized Recursion",
      status: "not-started",
      difficulty: "medium",
      priority: "medium",
      estimatedStudyTimeMinutes: 45,
      subtopics: [],
    },
    {
      id: "functional-recursion",
      title: "Functional Recursion",
      status: "not-started",
      difficulty: "medium",
      priority: "high",
      estimatedStudyTimeMinutes: 45,
      subtopics: [],
    },
    {
      id: "reverse-array",
      title: "Reverse an Array",
      status: "not-started",
      difficulty: "medium",
      priority: "high",
      estimatedStudyTimeMinutes: 45,
      subtopics: [],
    },
    {
      id: "palindrome-recursion",
      title: "Palindrome using Recursion",
      status: "not-started",
      difficulty: "medium",
      priority: "medium",
      estimatedStudyTimeMinutes: 45,
      subtopics: [],
    },
    {
      id: "fibonacci",
      title: "Nth Fibonacci Number",
      status: "not-started",
      difficulty: "medium",
      priority: "high",
      estimatedStudyTimeMinutes: 60,
      subtopics: [],
    }
  ],

  practice: [
    {
      id: "recursion-practice",
      title: "Recursion Coding Practice",
      type: "coding-practice",
      status: "not-started",
    },
  ],
};