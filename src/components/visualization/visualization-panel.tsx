"use client";

import { useMemo } from "react";

import { ArchitectureView } from "@/components/visualization/architecture-view";
import { DiagramView } from "@/components/visualization/diagram-view";
import { EntityRelationshipView } from "@/components/visualization/entity-relationship-view";
import { FlowchartView } from "@/components/visualization/flowchart-view";
import { MindmapView } from "@/components/visualization/mindmap-view";
import { TimelineView } from "@/components/visualization/timeline-view";
import { TreeView } from "@/components/visualization/tree-view";
import { visualizationService } from "@/services/visualization/visualization-service";
import type { AiParsedResponse } from "@/types/ai";
import type { VisualizationModel } from "@/types/visualization";

type VisualizationPanelProps = {
  response: AiParsedResponse;
};

function VisualizationRenderer({ visualization }: { visualization: VisualizationModel }) {
  if (
    visualization.kind === "binary-tree" ||
    visualization.kind === "bst" ||
    visualization.kind === "linked-list"
  ) {
    return <TreeView visualization={visualization} />;
  }

  if (visualization.kind === "timeline" || visualization.mermaidType === "timeline") {
    return <TimelineView visualization={visualization} />;
  }

  if (visualization.kind === "er-diagram" || visualization.kind === "database-relationships") {
    return <EntityRelationshipView visualization={visualization} />;
  }

  if (
    visualization.kind === "architecture" ||
    visualization.kind === "cloud-architecture" ||
    visualization.kind === "cpu-architecture" ||
    visualization.kind === "network-topology"
  ) {
    return <ArchitectureView visualization={visualization} />;
  }

  if (visualization.kind === "mind-map") {
    return <MindmapView visualization={visualization} />;
  }

  if (visualization.kind === "flowchart" || visualization.kind === "algorithm-steps") {
    return <FlowchartView visualization={visualization} />;
  }

  return <DiagramView visualization={visualization} />;
}

export function VisualizationPanel({ response }: VisualizationPanelProps) {
  const result = useMemo(() => visualizationService.fromAiResponse(response), [response]);

  if (result.visualizations.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Visualizations
        </p>
        <h3 className="mt-1 text-base font-semibold text-foreground">Generated learning aids</h3>
      </div>
      <div className="space-y-4">
        {result.visualizations.map((visualization) => (
          <VisualizationRenderer key={visualization.id} visualization={visualization} />
        ))}
      </div>
    </section>
  );
}
