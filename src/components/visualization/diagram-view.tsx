"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

import { DiagramCard } from "@/components/visualization/diagram-card";
import type { VisualizationModel } from "@/types/visualization";

type DiagramViewProps = {
  visualization: VisualizationModel;
  onRegenerate?: () => void;
};

export function DiagramView({ visualization, onRegenerate }: DiagramViewProps) {
  const reactId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [svg, setSvg] = useState("");
  const [error, setError] = useState<string | null>(null);
  const mermaidSource = useMemo(() => visualization.mermaid.trim(), [visualization.mermaid]);

  useEffect(() => {
    const element = containerRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "160px" },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) {
      return;
    }

    let cancelled = false;

    async function renderDiagram() {
      try {
        setError(null);
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          securityLevel: "strict",
          fontFamily: "Inter, ui-sans-serif, system-ui",
        });

        await mermaid.parse(mermaidSource);
        const result = await mermaid.render(
          `nexus-diagram-${reactId.replace(/[^a-zA-Z0-9]/g, "")}-${visualization.id}`,
          mermaidSource,
        );

        if (!cancelled) {
          setSvg(result.svg);
        }
      } catch {
        if (!cancelled) {
          setError("This diagram could not be rendered. Check the Mermaid syntax in the AI response.");
        }
      }
    }

    void renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [mermaidSource, reactId, visible, visualization.id]);

  return (
    <DiagramCard visualization={visualization} svg={svg} onRegenerate={onRegenerate}>
      <div ref={containerRef} className="min-h-[220px] overflow-auto rounded-md border border-border/70 bg-background/60 p-4">
        {!visible ? (
          <div className="flex min-h-[180px] items-center justify-center text-sm text-muted-foreground">
            Diagram will render when visible.
          </div>
        ) : null}
        {visible && !svg && !error ? (
          <div className="space-y-3">
            <div className="h-4 w-10/12 animate-pulse rounded bg-secondary" />
            <div className="h-32 animate-pulse rounded bg-secondary/70" />
          </div>
        ) : null}
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        {svg ? (
          <div
            className="min-w-[520px] [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : null}
      </div>
    </DiagramCard>
  );
}
