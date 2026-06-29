import { SectionHeader } from "@/components/academics/section-header";
import { SkillCard } from "@/components/skills/skill-card";
import type { SkillSummary } from "@/types/academic";

type SkillsOverviewProps = {
  skills: SkillSummary[];
};

export function SkillsOverview({ skills }: SkillsOverviewProps) {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-8">
      <SectionHeader
        eyebrow="Skills"
        title="Long-Term Learning"
        description="Skills live outside university coursework and can grow across all semesters."
      />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {skills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </section>
  );
}
