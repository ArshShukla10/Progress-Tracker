"use client";

import {
  BarChart3,
  BellDot,
  BookOpen,
  Bookmark,
  Box,
  Brain,
  CalendarDays,
  FileQuestion,
  Flame,
  Home,
  Library,
  MessageSquareText,
  Search,
  Settings2,
  Sparkles,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { routes } from "@/constants/routes";
import { cn } from "@/lib/utils";

const mainItems = [
  { label: "Dashboard", href: routes.home, icon: Home },
  { label: "Academics", href: routes.academics, icon: BookOpen },
  { label: "Skills", href: routes.skills, icon: Brain },
  { label: "AI Workspace", href: routes.knowledge, icon: Sparkles },
  { label: "Planner", href: routes.planner, icon: CalendarDays },
  { label: "Learning", href: routes.knowledge, icon: Library },
  { label: "Analytics", href: routes.analytics, icon: BarChart3 },
  { label: "Gamification", href: routes.analytics, icon: Trophy },
  { label: "Bookmarks", href: routes.knowledge, icon: Bookmark },
  { label: "Settings", href: routes.settings, icon: Settings2 },
];

const quickAccessItems = [
  { label: "Today's Plan", href: routes.planner, icon: CalendarDays },
  { label: "Revision Queue", href: routes.knowledge, icon: Flame },
  { label: "PYQ Practice", href: routes.knowledge, icon: FileQuestion },
  { label: "Flashcards", href: routes.knowledge, icon: Box },
  { label: "Interview Prep", href: routes.knowledge, icon: MessageSquareText },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[260px] border-r border-sidebar-border bg-sidebar px-3 py-4 lg:flex lg:flex-col">
      <div className="flex h-10 items-center justify-between px-2">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-7 items-center justify-center rounded-md border border-foreground/20 bg-background text-[13px] font-bold text-foreground">
            N
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-sidebar-foreground">
            NEXUS
          </span>
        </Link>
        <button
          type="button"
          className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
          aria-label="Collapse sidebar"
        >
          <BellDot className="size-4 rotate-90" />
        </button>
      </div>

      <div className="mt-4 flex h-10 items-center gap-2 rounded-xl border border-border bg-background px-3 text-muted-foreground">
        <Search className="size-4" />
        <span className="flex-1 text-[13px]">Search</span>
        <span className="text-[12px]">Ctrl K</span>
      </div>

      <nav className="mt-3 space-y-1">
        {mainItems.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={`${item.label}-${item.href}`}
              href={item.href}
              className={cn(
                "flex h-9 items-center gap-3 rounded-xl px-3 text-[14px] font-medium text-muted-foreground transition-all hover:bg-sidebar-accent hover:text-foreground",
                active && "bg-sidebar-accent text-foreground",
              )}
            >
              <Icon className="size-[18px]" strokeWidth={1.8} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-7 border-t border-border pt-5">
        <p className="px-3 text-[12px] font-medium text-muted-foreground">Quick Access</p>
        <nav className="mt-3 space-y-1">
          {quickAccessItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex h-9 items-center gap-3 rounded-xl px-3 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
              >
                <Icon className="size-[17px]" strokeWidth={1.8} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto rounded-2xl border border-border bg-background p-3 shadow-shell">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-full bg-primary text-[13px] font-semibold text-primary-foreground">
            AS
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-semibold text-foreground">Arsh</p>
            <p className="truncate text-[12px] text-muted-foreground">View Profile</p>
          </div>
          <span className="text-muted-foreground">›</span>
        </div>
      </div>
    </aside>
  );
}
