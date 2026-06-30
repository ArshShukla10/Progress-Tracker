import type { Skill } from "@/types/academic";

import { foundationsModule } from "./.foundations";

export const dsaSkill: Skill = {
  id: "dsa",

  name: "Data Structures & Algorithms",

  description:
    "Master Data Structures & Algorithms using a structured roadmap inspired by Striver's A2Z DSA Course. Learn concepts, revise efficiently, practice coding problems, and prepare for technical interviews inside NEXUS.",

  status: "unlocked",

  modules: [
    foundationsModule,
  ],
};