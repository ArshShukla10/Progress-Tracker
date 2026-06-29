import type { AiParsedResponse, AiResponseMetadata, AiResponseSection } from "@/types/ai";

export function parseAiResponse(raw: string, metadata?: AiResponseMetadata): AiParsedResponse {
  const lines = raw.split("\n").map((line) => line.trim()).filter(Boolean);
  const title = lines[0]?.replace(/^#+\s*/, "") ?? "AI Response";
  const sections: AiResponseSection[] = [];
  let bulletBuffer: string[] = [];

  function flushBullets() {
    if (bulletBuffer.length > 0) {
      sections.push({ type: "bullet-list", items: bulletBuffer });
      bulletBuffer = [];
    }
  }

  for (const line of lines.slice(1)) {
    if (line.startsWith("- ") || line.startsWith("* ")) {
      bulletBuffer.push(line.slice(2));
      continue;
    }

    flushBullets();

    if (line.startsWith("###") || line.startsWith("##")) {
      sections.push({ type: "heading", content: line.replace(/^#+\s*/, "") });
    } else if (line.toLowerCase().startsWith("tip:")) {
      sections.push({ type: "tip", content: line.slice(4).trim() });
    } else if (line.toLowerCase().startsWith("warning:")) {
      sections.push({ type: "warning", content: line.slice(8).trim() });
    } else {
      sections.push({ type: "paragraph", content: line });
    }
  }

  flushBullets();

  return {
    title,
    sections: [{ type: "title", content: title }, ...sections],
    raw,
    metadata,
  };
}
