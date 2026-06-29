"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type ProgressProps = {
  value: number;
  className?: string;
};

export function Progress({ value, className }: ProgressProps) {
  const boundedValue = Math.min(Math.max(value, 0), 100);

  return (
    <div className={cn("h-4 overflow-hidden rounded-full bg-secondary", className)}>
      <motion.div
        className="h-full rounded-full bg-primary"
        initial={{ width: 0 }}
        animate={{ width: `${boundedValue}%` }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
