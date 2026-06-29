"use client";

import { Check } from "lucide-react";
import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export function Checkbox({ className, checked, ...props }: CheckboxProps) {
  return (
    <span className="relative inline-flex size-5 shrink-0 items-center justify-center">
      <input
        type="checkbox"
        checked={checked}
        className="peer sr-only"
        {...props}
      />
      <span
        className={cn(
          "flex size-5 items-center justify-center rounded-sm border border-border bg-background transition-colors peer-checked:border-primary peer-checked:bg-primary",
          className,
        )}
      >
        <Check
          className={cn(
            "size-3.5 text-primary-foreground transition-opacity",
            checked ? "opacity-100" : "opacity-0",
          )}
        />
      </span>
    </span>
  );
}
