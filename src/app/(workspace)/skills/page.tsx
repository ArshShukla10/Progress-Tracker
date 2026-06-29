import { SkillsOverview } from "@/components/skills/skills-overview";
import { skillService } from "@/services/skill-service";

export default function SkillsPage() {
  return <SkillsOverview skills={skillService.getAllSkills()} />;
}
