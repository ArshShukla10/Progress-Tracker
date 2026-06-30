"use client";

import { Bell, ChevronDown, Home, Menu, Plus, Sun, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

function getPageLabel(pathname: string) {
  if (pathname === "/") {
    return "Dashboard";
  }

  const segment = pathname.split("/").filter(Boolean)[0] ?? "Dashboard";

  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function TopNavigation() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 flex h-[68px] items-center justify-between border-b border-border bg-background/95 px-5 backdrop-blur-xl lg:px-8">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation">
          <Menu className="size-5" />
        </Button>
        <div className="flex items-center gap-3 text-[15px] font-semibold text-foreground">
          <Home className="size-5" strokeWidth={1.8} />
          <span>{getPageLabel(pathname)}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="secondary" className="hidden h-10 gap-2 px-4 sm:inline-flex">
          <Plus className="size-4" />
          Quick Capture
        </Button>
        <div className="hidden h-6 w-px bg-border sm:block" />
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="size-5" strokeWidth={1.8} />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Theme">
          <Sun className="size-5" strokeWidth={1.8} />
        </Button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl px-1 py-1 text-sm text-foreground transition-colors hover:bg-secondary"
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-[13px] font-semibold text-primary-foreground">
            AS
          </span>
          <ChevronDown className="size-4 text-muted-foreground" />
          <UserRound className="sr-only" />
        </button>
      </div>
    </header>
  );
}
