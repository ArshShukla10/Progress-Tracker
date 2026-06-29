"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Copy, Download, Maximize2, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { VisualizationModel } from "@/types/visualization";

type DiagramCardProps = {
  visualization: VisualizationModel;
  children: React.ReactNode;
  svg?: string;
  onRegenerate?: () => void;
};

function downloadFile(filename: string, content: BlobPart, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function DiagramCard({ visualization, children, svg, onRegenerate }: DiagramCardProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copyMermaid() {
    await navigator.clipboard.writeText(visualization.mermaid);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  function downloadSvg() {
    if (svg) {
      downloadFile(`${visualization.id}.svg`, svg, "image/svg+xml");
    }
  }

  function downloadPng() {
    if (!svg) {
      return;
    }

    const image = new Image();
    const svgUrl = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width || 1200;
      canvas.height = image.height || 800;
      const context = canvas.getContext("2d");
      context?.drawImage(image, 0, 0);
      URL.revokeObjectURL(svgUrl);
      canvas.toBlob((blob) => {
        if (blob) {
          downloadFile(`${visualization.id}.png`, blob, "image/png");
        }
      });
    };

    image.src = svgUrl;
  }

  return (
    <Card className={expanded ? "fixed inset-4 z-50 overflow-auto bg-card" : "overflow-hidden"}>
      <CardHeader className="border-b border-border/70">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <CardTitle>{visualization.title}</CardTitle>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {visualization.kind} / {visualization.mermaidType}
            </p>
            {visualization.description ? (
              <p className="mt-2 text-sm text-muted-foreground">{visualization.description}</p>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="ghost" size="icon" onClick={copyMermaid} aria-label="Copy Mermaid">
              <Copy className="size-4" />
            </Button>
            <Button type="button" variant="ghost" size="icon" onClick={() => setExpanded(!expanded)} aria-label="Expand diagram">
              <Maximize2 className="size-4" />
            </Button>
            <Button type="button" variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} aria-label="Collapse diagram">
              {collapsed ? <ChevronDown className="size-4" /> : <ChevronUp className="size-4" />}
            </Button>
            <Button type="button" variant="ghost" size="icon" onClick={downloadSvg} disabled={!svg} aria-label="Download SVG">
              <Download className="size-4" />
            </Button>
            <Button type="button" variant="secondary" onClick={downloadPng} disabled={!svg}>
              PNG
            </Button>
            <Button type="button" variant="ghost" size="icon" onClick={onRegenerate} disabled={!onRegenerate} aria-label="Regenerate diagram">
              <RefreshCcw className="size-4" />
            </Button>
          </div>
        </div>
        {copied ? <p className="text-xs text-muted-foreground">Mermaid copied.</p> : null}
      </CardHeader>
      {collapsed ? null : <CardContent className="pt-6">{children}</CardContent>}
    </Card>
  );
}
