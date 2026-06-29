export type MermaidDiagramType =
  | "flowchart"
  | "graph"
  | "sequenceDiagram"
  | "classDiagram"
  | "stateDiagram"
  | "erDiagram"
  | "journey"
  | "timeline"
  | "pie"
  | "gitGraph";

export type VisualizationKind =
  | "flowchart"
  | "binary-tree"
  | "bst"
  | "linked-list"
  | "graph"
  | "timeline"
  | "er-diagram"
  | "architecture"
  | "class-diagram"
  | "state-diagram"
  | "sequence-diagram"
  | "network-topology"
  | "memory-layout"
  | "cpu-architecture"
  | "cloud-architecture"
  | "database-relationships"
  | "algorithm-steps"
  | "mind-map"
  | "neural-network"
  | "circuit-diagram";

export type VisualizationSource = "mermaid" | "structured";

export type VisualizationModel = {
  id: string;
  title: string;
  kind: VisualizationKind;
  source: VisualizationSource;
  mermaidType: MermaidDiagramType;
  mermaid: string;
  description?: string;
};

export type VisualizationParseResult = {
  visualizations: VisualizationModel[];
  warnings: string[];
};

export type StructuredVisualizationInput = {
  title?: string;
  type?: VisualizationKind | MermaidDiagramType;
  diagram?: string;
  mermaid?: string;
  description?: string;
};
