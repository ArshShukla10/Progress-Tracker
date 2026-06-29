import { parseVisualizations } from "@/services/visualization/diagram-parser";
import type { AiParsedResponse } from "@/types/ai";
import type { VisualizationParseResult } from "@/types/visualization";

function fromAiResponse(response: AiParsedResponse): VisualizationParseResult {
  return parseVisualizations(response.raw);
}

export const visualizationService = {
  fromAiResponse,
  parse: parseVisualizations,
};
