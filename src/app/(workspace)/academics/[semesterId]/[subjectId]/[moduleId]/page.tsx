import { notFound } from "next/navigation";

import { LearningWorkspace } from "@/components/learning/learning-workspace";
import { academicService } from "@/services/academic-service";

type ModulePageProps = {
  params: Promise<{
    semesterId: string;
    subjectId: string;
    moduleId: string;
  }>;
};

export function generateStaticParams() {
  return academicService.getAllSemesters().flatMap((semester) =>
    semester.subjects.flatMap((subject) =>
      subject.modules.map((subjectModule) => ({
        semesterId: semester.id,
        subjectId: subject.id,
        moduleId: academicService.getModuleRouteSegment(subjectModule),
      })),
    ),
  );
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { semesterId, subjectId, moduleId } = await params;
  const view = academicService.getModuleWorkspaceView(semesterId, subjectId, moduleId);

  if (!view || academicService.getSemesterStatus(view.semester) === "locked") {
    notFound();
  }

  return <LearningWorkspace view={view} />;
}
