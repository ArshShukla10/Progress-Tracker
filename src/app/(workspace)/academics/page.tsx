import { AcademicsOverview } from "@/components/academics/academics-overview";
import { academicService } from "@/services/academic-service";

export default function AcademicsPage() {
  return <AcademicsOverview semesters={academicService.getSemesterSummaries()} />;
}
