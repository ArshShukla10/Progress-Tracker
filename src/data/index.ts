import { semester1, semester1ContinueLearning, semester1StudyTasks } from "@/data/semester1";
import { semester2, semester2ContinueLearning, semester2StudyTasks } from "@/data/semester2";
import { semester3, semester3ContinueLearning, semester3StudyTasks } from "@/data/semester3";
import { semester4, semester4ContinueLearning, semester4StudyTasks } from "@/data/semester4";
import { semester5, semester5ContinueLearning, semester5StudyTasks } from "@/data/semester5";
import { semester6, semester6ContinueLearning, semester6StudyTasks } from "@/data/semester6";
import { semester7, semester7ContinueLearning, semester7StudyTasks } from "@/data/semester7";
import { semester8, semester8ContinueLearning, semester8StudyTasks } from "@/data/semester8";
import type { ContinueLearning, Semester, StudyTask } from "@/types/academic";

type AcademicData = {
  semesters: Semester[];
  currentSemesterId: string;
  dashboard: {
    profileName: string;
    semesterTasks: Record<string, StudyTask[]>;
    continueLearning: Record<string, ContinueLearning | null>;
  };
};

export const academicData: AcademicData = {
  semesters: [semester1, semester2, semester3, semester4, semester5, semester6, semester7, semester8],
  currentSemesterId: "semester-3",
  dashboard: {
    profileName: "Arsh",
    semesterTasks: {
      "semester-1": semester1StudyTasks,
      "semester-2": semester2StudyTasks,
      "semester-3": semester3StudyTasks,
      "semester-4": semester4StudyTasks,
      "semester-5": semester5StudyTasks,
      "semester-6": semester6StudyTasks,
      "semester-7": semester7StudyTasks,
      "semester-8": semester8StudyTasks,
    },
    continueLearning: {
      "semester-1": semester1ContinueLearning,
      "semester-2": semester2ContinueLearning,
      "semester-3": semester3ContinueLearning,
      "semester-4": semester4ContinueLearning,
      "semester-5": semester5ContinueLearning,
      "semester-6": semester6ContinueLearning,
      "semester-7": semester7ContinueLearning,
      "semester-8": semester8ContinueLearning,
    },
  },
};
