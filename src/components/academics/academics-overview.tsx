import { SectionHeader } from "@/components/academics/section-header";
import { SemesterCard } from "@/components/academics/semester-card";
import type { SemesterSummary } from "@/types/academic";

type AcademicsOverviewProps = {
  semesters: SemesterSummary[];
};

export function AcademicsOverview({ semesters }: AcademicsOverviewProps) {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-8">
      <SectionHeader
        eyebrow="Academics"
        title="Academic Roadmap"
        description="Track every semester from one calm, structured academic workspace."
      />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {semesters.map((semester, index) => (
          <SemesterCard key={semester.id} semester={semester} index={index} />
        ))}
      </div>
    </section>
  );
}
