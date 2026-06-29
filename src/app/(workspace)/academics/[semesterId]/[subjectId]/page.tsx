import { notFound } from "next/navigation";

import { SubjectDetail } from "@/components/academics/subject-detail";
import { academicService } from "@/services/academic-service";

type SubjectPageProps = {
  params: Promise<{
    semesterId: string;
    subjectId: string;
  }>;
};

export function generateStaticParams() {
  return academicService.getAllSemesters().flatMap((semester) =>
    semester.subjects.map((subject) => ({
      semesterId: semester.id,
      subjectId: subject.id,
    })),
  );
}

export default async function SubjectPage({ params }: SubjectPageProps) {
  const { semesterId, subjectId } = await params;
  const view = academicService.getSubjectView(semesterId, subjectId);

  if (!view || academicService.getSemesterStatus(view.semester) === "locked") {
    notFound();
  }

  return <SubjectDetail view={view} />;
}
