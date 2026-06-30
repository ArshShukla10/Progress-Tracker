import type { Module } from "@/types/academic";

export const hashingModule: Module = {
  id: "hashing",

  title: "Hashing",

  description:
    "Master frequency counting and hash-based techniques.",

  difficulty: "easy",

  priority: "high",

  estimatedStudyTimeMinutes: 300,

  topics: [
    {
      id: "number-hashing",
      title: "Number Hashing",
      status: "not-started",
      difficulty: "easy",
      priority: "high",
      estimatedStudyTimeMinutes: 45,
      subtopics: [],
    },
    {
      id: "character-hashing",
      title: "Character Hashing",
      status: "not-started",
      difficulty: "easy",
      priority: "high",
      estimatedStudyTimeMinutes: 45,
      subtopics: [],
    },
    {
      id: "hash-array",
      title: "Hash Arrays",
      status: "not-started",
      difficulty: "easy",
      priority: "medium",
      estimatedStudyTimeMinutes: 45,
      subtopics: [],
    },
    {
      id: "unordered-map",
      title: "unordered_map",
      status: "not-started",
      difficulty: "medium",
      priority: "high",
      estimatedStudyTimeMinutes: 60,
      subtopics: [],
    },
    {
      id: "unordered-set",
      title: "unordered_set",
      status: "not-started",
      difficulty: "medium",
      priority: "medium",
      estimatedStudyTimeMinutes: 45,
      subtopics: [],
    }
  ],

  practice: [
    {
      id: "hashing-practice",
      title: "Hashing Practice",
      type: "coding-practice",
      status: "not-started",
    },
  ],
};