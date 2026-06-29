import { BookOpen, CalendarDays, Home, Library, Settings2 } from "lucide-react";

import { appConfig } from "@/config/app";
import { routes } from "@/constants/routes";
import { cn } from "@/lib/utils";
import type { NavigationItem } from "@/types/navigation";

const sidebarItems: NavigationItem[] = [
  { label: "Dashboard", href: routes.home, icon: Home, active: true },
  { label: "Academics", href: routes.academics, icon: BookOpen },
  { label: "Knowledge", href: routes.knowledge, icon: Library },
  { label: "Planner", href: routes.planner, icon: CalendarDays },
  { label: "Settings", href: routes.settings, icon: Settings2 },
];

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-sidebar-border bg-sidebar/95 px-4 py-5 shadow-shell backdrop-blur lg:flex lg:flex-col">
      <div className="flex h-12 items-center gap-3 px-2">
        <div className="flex size-9 items-center justify-center rounded-md border border-primary/30 bg-primary/12 text-sm font-semibold text-primary">
          NX
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-wide text-sidebar-foreground">
            {appConfig.name}
          </p>
          <p className="truncate text-xs text-muted-foreground">{appConfig.tagline}</p>
        </div>
      </div>

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground",
                item.active && "bg-sidebar-accent text-sidebar-foreground",
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
