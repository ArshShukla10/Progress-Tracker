import { SectionHeader } from "@/components/academics/section-header";
import { SubjectCard } from "@/components/academics/subject-card";
import type { SemesterView } from "@/types/academic";

type SemesterDetailProps = {
  view: SemesterView;
};

export function SemesterDetail({ view }: SemesterDetailProps) {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-8">
      <SectionHeader
        eyebrow="Academics"
        title={view.semester.title}
        description="Subjects, progress, and the next learning path for this semester."
      />
      <div className="grid gap-5 xl:grid-cols-2">
        {view.subjects.map((subject, index) => (
          <SubjectCard key={subject.id} subject={subject} index={index} />
        ))}
      </div>
    </section>
  );
}
