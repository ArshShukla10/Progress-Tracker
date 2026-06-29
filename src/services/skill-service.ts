import { skillsContent } from "@/content/skills";
import type { Progress, Skill, SkillSummary, SkillView } from "@/types/academic";

function isCompletedStatus(status: string) {
  return status === "completed" || status === "revised" || status === "mastered";
}

function calculateSkillProgress(skill: Skill): Progress {
  const topics = skill.modules.flatMap((module) => module.topics);
  const totalTopics = topics.length;
  const completedTopics = topics.filter((topic) => isCompletedStatus(topic.status)).length;

  return {
    completedTopics,
    totalTopics,
    percentage: totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0,
  };
}

function toSkillSummary(skill: Skill): SkillSummary {
  return {
    id: skill.id,
    name: skill.name,
    description: skill.description,
    status: skill.status,
    progress: calculateSkillProgress(skill),
  };
}

function getAllSkills(): SkillSummary[] {
  return skillsContent.map(toSkillSummary);
}

function getSkill(skillId: string): SkillView | null {
  const skill = skillsContent.find((item) => item.id === skillId);

  if (!skill) {
    return null;
  }

  return {
    skill,
    progress: calculateSkillProgress(skill),
  };
}

function getUnlockedSkills(): SkillSummary[] {
  return getAllSkills().filter((skill) => skill.status === "unlocked");
}

function getLockedSkills(): SkillSummary[] {
  return getAllSkills().filter((skill) => skill.status === "locked");
}

function getSkillProgress(skillId: string): Progress {
  return getSkill(skillId)?.progress ?? {
    completedTopics: 0,
    totalTopics: 0,
    percentage: 0,
  };
}

export const skillService = {
  getAllSkills,
  getSkill,
  getUnlockedSkills,
  getLockedSkills,
  getSkillProgress,
};
