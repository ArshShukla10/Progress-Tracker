import { buildVisualizationModel } from "@/services/visualization/diagram-builder";
import type {
  MermaidDiagramType,
  StructuredVisualizationInput,
  VisualizationKind,
  VisualizationModel,
  VisualizationParseResult,
} from "@/types/visualization";

function parseJsonVisualization(content: string): StructuredVisualizationInput | null {
  try {
    const parsed = JSON.parse(content) as StructuredVisualizationInput;
    return parsed;
  } catch {
    return null;
  }
}

function parseKeyValueVisualization(content: string): StructuredVisualizationInput | null {
  const lines = content.split("\n");
  const input: StructuredVisualizationInput = {};
  let activeBlock: "mermaid" | "diagram" | null = null;
  const blockLines: string[] = [];

  for (const line of lines) {
    const keyValue = line.match(/^([a-zA-Z-]+):\s*(.*)$/);

    if (keyValue && keyValue[1]) {
      if (activeBlock) {
        input[activeBlock] = blockLines.join("\n").trim();
        blockLines.length = 0;
        activeBlock = null;
      }

      const key = keyValue[1].toLowerCase();
      const value = keyValue[2] ?? "";

      if (key === "title") {
        input.title = value;
      } else if (key === "type") {
        input.type = value as StructuredVisualizationInput["type"];
      } else if (key === "description") {
        input.description = value;
      } else if (key === "mermaid" || key === "diagram") {
        activeBlock = key;
        if (value) {
          blockLines.push(value);
        }
      }

      continue;
    }

    if (activeBlock) {
      blockLines.push(line);
    }
  }

  if (activeBlock) {
    input[activeBlock] = blockLines.join("\n").trim();
  }

  return input.mermaid || input.diagram ? input : null;
}

export function parseVisualizations(content: string): VisualizationParseResult {
  const visualizations: VisualizationModel[] = [];
  const warnings: string[] = [];
  const fencePattern = /```([\w-]+)?\n([\s\S]*?)```/g;
  let match = fencePattern.exec(content);

  while (match) {
    const language = (match[1] ?? "").toLowerCase();
    const body = match[2] ?? "";
    const index = visualizations.length;

    if (language === "mermaid") {
      const model = buildVisualizationModel({
        input: {
          mermaid: body,
          type: body.trim().split(/\s+/)[0] as MermaidDiagramType | VisualizationKind,
        },
        index,
        source: "mermaid",
      });

      if (model) {
        visualizations.push(model);
      }
    }

    if (language === "visualization" || language === "diagram") {
      const input = parseJsonVisualization(body) ?? parseKeyValueVisualization(body);
      const model = input
        ? buildVisualizationModel({ input, index, source: "structured" })
        : null;

      if (model) {
        visualizations.push(model);
      } else {
        warnings.push("A visualization block was found but could not be parsed.");
      }
    }

    match = fencePattern.exec(content);
  }

  return { visualizations, warnings };
}
