import type {
  MermaidDiagramType,
  StructuredVisualizationInput,
  VisualizationKind,
  VisualizationModel,
  VisualizationSource,
} from "@/types/visualization";

const mermaidTypes = new Set<MermaidDiagramType>([
  "flowchart",
  "graph",
  "sequenceDiagram",
  "classDiagram",
  "stateDiagram",
  "erDiagram",
  "journey",
  "timeline",
  "pie",
  "gitGraph",
]);

const kindToMermaidType: Record<VisualizationKind, MermaidDiagramType> = {
  flowchart: "flowchart",
  "binary-tree": "graph",
  bst: "graph",
  "linked-list": "graph",
  graph: "graph",
  timeline: "timeline",
  "er-diagram": "erDiagram",
  architecture: "flowchart",
  "class-diagram": "classDiagram",
  "state-diagram": "stateDiagram",
  "sequence-diagram": "sequenceDiagram",
  "network-topology": "graph",
  "memory-layout": "flowchart",
  "cpu-architecture": "flowchart",
  "cloud-architecture": "flowchart",
  "database-relationships": "erDiagram",
  "algorithm-steps": "flowchart",
  "mind-map": "flowchart",
  "neural-network": "graph",
  "circuit-diagram": "graph",
};

const mermaidTypeToKind: Record<MermaidDiagramType, VisualizationKind> = {
  flowchart: "flowchart",
  graph: "graph",
  sequenceDiagram: "sequence-diagram",
  classDiagram: "class-diagram",
  stateDiagram: "state-diagram",
  erDiagram: "er-diagram",
  journey: "timeline",
  timeline: "timeline",
  pie: "graph",
  gitGraph: "algorithm-steps",
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getMermaidType(value: string): MermaidDiagramType | null {
  const token = value.trim().split(/\s+/)[0] as MermaidDiagramType | undefined;

  if (token && mermaidTypes.has(token)) {
    return token;
  }

  return null;
}

export function getVisualizationKind(value: string): VisualizationKind {
  const normalized = value.trim() as VisualizationKind | MermaidDiagramType;

  if (normalized in kindToMermaidType) {
    return normalized as VisualizationKind;
  }

  if (mermaidTypes.has(normalized as MermaidDiagramType)) {
    return mermaidTypeToKind[normalized as MermaidDiagramType];
  }

  return "flowchart";
}

export function normalizeMermaid(mermaid: string, requestedType?: string) {
  const trimmed = repairMermaidSyntax(mermaid);
  const existingType = getMermaidType(trimmed);

  if (existingType) {
    return {
      mermaid: trimmed,
      mermaidType: existingType,
      kind: getVisualizationKind(existingType),
    };
  }

  const kind = requestedType ? getVisualizationKind(requestedType) : "flowchart";
  const mermaidType = kindToMermaidType[kind];

  return {
    mermaid: `${mermaidType} TD\n${trimmed}`,
    mermaidType,
    kind,
  };
}

export function repairMermaidSyntax(mermaid: string) {
  const lines = mermaid
    .trim()
    .split("\n")
    .map((line) => line.trimEnd())
    .filter((line) => line.trim().length > 0);

  if (lines.length === 0) {
    return "";
  }

  const firstLine = lines[0].trim();

  if (firstLine === "flowchart" || firstLine === "graph") {
    lines[0] = `${firstLine} TD`;
  }

  return lines.join("\n");
}

export function buildVisualizationModel({
  input,
  index,
  source,
}: {
  input: StructuredVisualizationInput;
  index: number;
  source: VisualizationSource;
}): VisualizationModel | null {
  const diagram = input.mermaid ?? input.diagram;

  if (!diagram?.trim()) {
    return null;
  }

  const normalized = normalizeMermaid(diagram, input.type);
  const title = input.title?.trim() || `${normalized.kind.replace(/-/g, " ")} ${index + 1}`;

  return {
    id: `${slugify(title) || "visualization"}-${index}`,
    title,
    kind: input.type ? getVisualizationKind(input.type) : normalized.kind,
    source,
    mermaidType: normalized.mermaidType,
    mermaid: normalized.mermaid,
    description: input.description,
  };
}
