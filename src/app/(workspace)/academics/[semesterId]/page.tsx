import { notFound } from "next/navigation";

import { SemesterDetail } from "@/components/academics/semester-detail";
import { academicService } from "@/services/academic-service";

type SemesterPageProps = {
  params: Promise<{
    semesterId: string;
  }>;
};

export function generateStaticParams() {
  return academicService.getAllSemesters().map((semester) => ({
    semesterId: semester.id,
  }));
}

export default async function SemesterPage({ params }: SemesterPageProps) {
  const { semesterId } = await params;
  const view = academicService.getSemesterView(semesterId);

  if (!view || view.status === "locked") {
    notFound();
  }

  return <SemesterDetail view={view} />;
}
