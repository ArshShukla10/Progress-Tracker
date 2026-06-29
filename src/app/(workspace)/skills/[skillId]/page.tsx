import { notFound } from "next/navigation";

import { SkillDetail } from "@/components/skills/skill-detail";
import { skillService } from "@/services/skill-service";

type SkillPageProps = {
  params: Promise<{
    skillId: string;
  }>;
};

export function generateStaticParams() {
  return skillService.getUnlockedSkills().map((skill) => ({
    skillId: skill.id,
  }));
}

export default async function SkillPage({ params }: SkillPageProps) {
  const { skillId } = await params;
  const view = skillService.getSkill(skillId);

  if (!view || view.skill.status === "locked") {
    notFound();
  }

  return <SkillDetail view={view} />;
}
