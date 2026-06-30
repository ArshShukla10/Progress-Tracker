"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";

type MarkdownRendererProps = {
  content: string;
};

type CodeBlock = {
  type: "code";
  language: string;
  content: string;
};

type TextBlock = {
  type: "text";
  content: string;
};

type MarkdownBlock = CodeBlock | TextBlock;

const supportedLanguages = new Set([
  "c",
  "cpp",
  "c++",
  "java",
  "python",
  "javascript",
  "typescript",
  "sql",
  "html",
  "css",
  "json",
  "markdown",
  "mermaid",
]);

const keywordPattern =
  /\b(function|const|let|var|return|class|extends|implements|public|private|protected|if|else|for|while|switch|case|break|import|from|export|type|interface|new|try|catch|async|await|SELECT|FROM|WHERE|JOIN|INSERT|UPDATE|DELETE|CREATE|TABLE|PRIMARY|KEY|public|static|void|int|float|double|char|boolean|String)\b/;

function renderHighlightedCode(content: string) {
  return content.split("\n").map((line, lineIndex) => {
    const parts = line.split(keywordPattern).filter((part) => part.length > 0);

    return (
      <span key={`line-${lineIndex}`} className="block">
        {parts.map((part, partIndex) =>
          keywordPattern.test(part) ? (
            <span key={`part-${partIndex}`} className="text-primary">
              {part}
            </span>
          ) : (
            <span key={`part-${partIndex}`}>{part}</span>
          ),
        )}
      </span>
    );
  });
}

function splitCodeBlocks(content: string): MarkdownBlock[] {
  const blocks: MarkdownBlock[] = [];
  const codeFencePattern = /```([\w+#-]+)?\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match = codeFencePattern.exec(content);

  while (match) {
    if (match.index > lastIndex) {
      blocks.push({ type: "text", content: content.slice(lastIndex, match.index) });
    }

    blocks.push({
      type: "code",
      language: match[1] ?? "text",
      content: match[2] ?? "",
    });

    lastIndex = codeFencePattern.lastIndex;
    match = codeFencePattern.exec(content);
  }

  if (lastIndex < content.length) {
    blocks.push({ type: "text", content: content.slice(lastIndex) });
  }

  return blocks;
}

function renderInline(text: string) {
  const parts = text
    .split(/(\*\*[^*]+\*\*|`[^`]+`|\$\$?[^$]+\$?\$|\[[^\]]+\]\([^)]+\))/g)
    .filter(Boolean);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={`strong-${index}`} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={`inline-code-${index}`} className="rounded bg-secondary px-1 py-0.5 text-primary">
          {part.slice(1, -1)}
        </code>
      );
    }

    if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
      const label = part.slice(1, part.indexOf("]("));
      const href = part.slice(part.indexOf("](") + 2, -1);

      return (
        <Link key={`link-${index}`} href={href} className="text-primary underline-offset-4 hover:underline">
          {label}
        </Link>
      );
    }

    if (part.startsWith("$$") && part.endsWith("$$")) {
      return (
        <span key={`math-block-${index}`} className="font-mono text-primary">
          {part.slice(2, -2)}
        </span>
      );
    }

    if (part.startsWith("$") && part.endsWith("$")) {
      return (
        <span key={`math-inline-${index}`} className="font-mono text-primary">
          {part.slice(1, -1)}
        </span>
      );
    }

    return <span key={`text-${index}`}>{part}</span>;
  });
}

function isTableSeparator(line: string) {
  return /^\s*\|?(\s*:?-{3,}:?\s*\|)+\s*:?-{3,}:?\s*\|?\s*$/.test(line);
}

function splitTableRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function renderTable(lines: string[], key: string) {
  const header = splitTableRow(lines[0]);
  const rows = lines.slice(2).map(splitTableRow);

  return (
    <div key={key} className="overflow-x-auto rounded-md border border-border/70">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead className="bg-secondary/50 text-foreground">
          <tr>
            {header.map((cell, index) => (
              <th key={`head-${index}`} className="px-3 py-2 font-medium">
                {renderInline(cell)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/70 text-muted-foreground">
          {rows.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td key={`cell-${cellIndex}`} className="px-3 py-2">
                  {renderInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderTextBlock(content: string) {
  const lines = content.split("\n").filter((line) => line.trim().length > 0);
  const elements: React.ReactNode[] = [];

  let listItems: string[] = [];
  let orderedItems: string[] = [];
  let taskItems: { checked: boolean; text: string }[] = [];
  let tableLines: string[] = [];

  function flushTable() {
    if (tableLines.length >= 2 && isTableSeparator(tableLines[1])) {
      elements.push(renderTable(tableLines, `table-${elements.length}`));
    } else {
      tableLines.forEach((line) => {
        elements.push(
          <p key={`table-fallback-${elements.length}`} className="text-sm leading-6 text-muted-foreground">
            {renderInline(line)}
          </p>,
        );
      });
    }

    tableLines = [];
  }

  function flushLists() {
    if (tableLines.length > 0) {
      flushTable();
    }

    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {listItems.map((item, index) => (
            <li key={`bullet-${index}`}>{renderInline(item)}</li>
          ))}
        </ul>,
      );
      listItems = [];
    }

    if (orderedItems.length > 0) {
      elements.push(
        <ol key={`ol-${elements.length}`} className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          {orderedItems.map((item, index) => (
            <li key={`ordered-${index}`}>{renderInline(item)}</li>
          ))}
        </ol>,
      );
      orderedItems = [];
    }

    if (taskItems.length > 0) {
      elements.push(
        <ul key={`tasks-${elements.length}`} className="space-y-1 text-sm text-muted-foreground">
          {taskItems.map((item, index) => (
            <li key={`task-${index}`} className="flex items-center gap-2">
              <span className="inline-flex size-4 items-center justify-center rounded-sm border border-border text-[10px]">
                {item.checked ? <Check className="size-3" /> : null}
              </span>
              {renderInline(item.text)}
            </li>
          ))}
        </ul>,
      );
      taskItems = [];
    }
  }

  for (const line of lines) {
    if (line.includes("|") && !line.startsWith("> ")) {
      tableLines.push(line);
      continue;
    }

    if (line.startsWith("- [ ] ") || line.startsWith("- [x] ")) {
      taskItems.push({ checked: line.startsWith("- [x] "), text: line.slice(6) });
      continue;
    }

    if (line.startsWith("- ") || line.startsWith("* ")) {
      listItems.push(line.slice(2));
      continue;
    }

    const orderedMatch = line.match(/^\d+\.\s(.+)/);

    if (orderedMatch) {
      orderedItems.push(orderedMatch[1]);
      continue;
    }

    flushLists();

    if (line.startsWith("# ")) {
      elements.push(
        <h1 key={`h1-${elements.length}`} className="text-xl font-semibold text-foreground">
          {renderInline(line.slice(2))}
        </h1>,
      );
    } else if (line.startsWith("## ")) {
      elements.push(
        <h2 key={`h2-${elements.length}`} className="text-base font-semibold text-foreground">
          {renderInline(line.slice(3))}
        </h2>,
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={`h3-${elements.length}`} className="text-sm font-semibold text-foreground">
          {renderInline(line.slice(4))}
        </h3>,
      );
    } else if (line.startsWith("> ")) {
      elements.push(
        <blockquote key={`quote-${elements.length}`} className="border-l-2 border-primary pl-3 text-sm text-muted-foreground">
          {renderInline(line.slice(2))}
        </blockquote>,
      );
    } else if (line === "---") {
      elements.push(<hr key={`hr-${elements.length}`} className="border-border" />);
    } else {
      elements.push(
        <p key={`para-${elements.length}`} className="text-sm leading-6 text-muted-foreground">
          {renderInline(line)}
        </p>,
      );
    }
  }

  flushLists();

  return elements;
}

function CodeBlockView({ language, content }: CodeBlock) {
  const [copied, setCopied] = useState(false);
  const normalizedLanguage = supportedLanguages.has(language.toLowerCase()) ? language : "text";

  async function copyCode() {
    if (typeof navigator === "undefined") {
      return;
    }

    await navigator.clipboard.writeText(content);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="overflow-hidden rounded-md border border-border bg-background">
      <div className="flex items-center justify-between border-b border-border/70 bg-secondary/40 px-3 py-2">
        <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {normalizedLanguage}
        </span>
        <Button type="button" variant="ghost" size="icon" onClick={copyCode} aria-label="Copy code">
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </Button>
      </div>
      <pre className="overflow-x-auto p-4 text-xs leading-6 text-foreground">
        <code data-language={normalizedLanguage}>{renderHighlightedCode(content)}</code>
      </pre>
    </div>
  );
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="space-y-3">
      {splitCodeBlocks(content).map((block, index) => {
        if (block.type === "code") {
          return <CodeBlockView key={`code-${index}`} {...block} />;
        }

        return (
          <div key={`text-${index}`} className="space-y-3">
            {renderTextBlock(block.content)}
          </div>
        );
      })}
    </div>
  );
}
