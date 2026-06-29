import { DiagramView } from "@/components/visualization/diagram-view";
import type { VisualizationModel } from "@/types/visualization";

export function TimelineView({ visualization }: { visualization: VisualizationModel }) {
  return <DiagramView visualization={visualization} />;
}
