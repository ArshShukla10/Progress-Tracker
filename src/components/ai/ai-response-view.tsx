import type { AiParsedResponse } from "@/types/ai";

type AiResponseViewProps = {
  response: AiParsedResponse;
};

export function AiResponseView({ response }: AiResponseViewProps) {
  return (
    <div className="space-y-3 rounded-md border border-border/70 bg-background/32 p-4">
      {response.sections.map((section, index) => {
        if (section.type === "title") {
          return (
            <p key={index} className="text-sm font-semibold text-foreground">
              {section.content}
            </p>
          );
        }

        if (section.type === "heading") {
          return (
            <p key={index} className="text-sm font-medium text-primary">
              {section.content}
            </p>
          );
        }

        if (section.type === "bullet-list") {
          return (
            <ul key={index} className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={index} className="text-sm leading-6 text-muted-foreground">
            {section.content}
          </p>
        );
      })}
    </div>
  );
}
