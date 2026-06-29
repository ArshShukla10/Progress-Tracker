import { DiagramView } from "@/components/visualization/diagram-view";
import type { VisualizationModel } from "@/types/visualization";

export function ArchitectureView({ visualization }: { visualization: VisualizationModel }) {
  return <DiagramView visualization={visualization} />;
}
