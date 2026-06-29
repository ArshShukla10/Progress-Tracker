import { dsaSkill } from "@/content/skills/dsa";
import type { Skill } from "@/types/academic";

const lockedSkills: Skill[] = [
  { id: "machine-learning", name: "Machine Learning", status: "locked", modules: [] },
  { id: "web-development", name: "Web Development", status: "locked", modules: [] },
  { id: "git-github", name: "Git & GitHub", status: "locked", modules: [] },
  { id: "system-design", name: "System Design", status: "locked", modules: [] },
  { id: "operating-systems", name: "Operating Systems", status: "locked", modules: [] },
  { id: "computer-networks", name: "Computer Networks", status: "locked", modules: [] },
  { id: "devops", name: "DevOps", status: "locked", modules: [] },
  { id: "artificial-intelligence", name: "Artificial Intelligence", status: "locked", modules: [] },
  { id: "open-source", name: "Open Source", status: "locked", modules: [] },
  { id: "interview-preparation", name: "Interview Preparation", status: "locked", modules: [] },
  { id: "aptitude", name: "Aptitude", status: "locked", modules: [] },
];

export const skillsContent: Skill[] = [dsaSkill, ...lockedSkills];

export { dsaSkill };
