import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ModuleWorkspaceView } from "@/types/academic";

type ModuleNavigatorProps = {
  view: ModuleWorkspaceView;
};

export function ModuleNavigator({ view }: ModuleNavigatorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Modules</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {view.moduleNavigation.modules.map((item) => {
              const active = item.label === view.module.title;

              return (
                <Button
                  key={item.href}
                  asChild
                  variant={active ? "default" : "secondary"}
                  className={cn("shrink-0", active && "pointer-events-none")}
                >
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              );
            })}
          </div>
          <div className="flex gap-2">
            <Button asChild variant="secondary" disabled={!view.moduleNavigation.previous} className="gap-2">
              {view.moduleNavigation.previous ? (
                <Link href={view.moduleNavigation.previous.href}>
                  <ArrowLeft className="size-4" />
                  Previous
                </Link>
              ) : (
                <span>
                  <ArrowLeft className="size-4" />
                  Previous
                </span>
              )}
            </Button>
            <Button asChild variant="secondary" disabled={!view.moduleNavigation.next} className="gap-2">
              {view.moduleNavigation.next ? (
                <Link href={view.moduleNavigation.next.href}>
                  Next
                  <ArrowRight className="size-4" />
                </Link>
              ) : (
                <span>
                  Next
                  <ArrowRight className="size-4" />
                </span>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
