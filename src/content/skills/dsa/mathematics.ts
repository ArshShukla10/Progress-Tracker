import type { Module } from "@/types/academic";

export const mathematicsModule: Module = {
  id: "mathematics",

  title: "Basic Mathematics",

  description:
    "Strengthen mathematical concepts frequently used in programming and problem solving.",

  difficulty: "easy",

  priority: "high",

  estimatedStudyTimeMinutes: 360,

  topics: [
    {
      id: "count-digits",
      title: "Count Digits",
      status: "not-started",
      difficulty: "easy",
      priority: "high",
      estimatedStudyTimeMinutes: 30,
      subtopics: [],
    },
    {
      id: "reverse-number",
      title: "Reverse Integer",
      status: "not-started",
      difficulty: "easy",
      priority: "high",
      estimatedStudyTimeMinutes: 30,
      subtopics: [],
    },
    {
      id: "palindrome-number",
      title: "Palindrome Number",
      status: "not-started",
      difficulty: "easy",
      priority: "medium",
      estimatedStudyTimeMinutes: 30,
      subtopics: [],
    },
    {
      id: "gcd-hcf",
      title: "GCD / HCF",
      status: "not-started",
      difficulty: "easy",
      priority: "high",
      estimatedStudyTimeMinutes: 45,
      subtopics: [],
    },
    {
      id: "armstrong-number",
      title: "Armstrong Number",
      status: "not-started",
      difficulty: "easy",
      priority: "low",
      estimatedStudyTimeMinutes: 30,
      subtopics: [],
    },
    {
      id: "prime-numbers",
      title: "Prime Numbers",
      status: "not-started",
      difficulty: "easy",
      priority: "high",
      estimatedStudyTimeMinutes: 45,
      subtopics: [],
    },
    {
      id: "divisors",
      title: "Print Divisors",
      status: "not-started",
      difficulty: "easy",
      priority: "medium",
      estimatedStudyTimeMinutes: 45,
      subtopics: [],
    }
  ],

  practice: [
    {
      id: "math-practice",
      title: "Basic Mathematics Practice",
      type: "coding-practice",
      status: "not-started",
    },
  ],
};