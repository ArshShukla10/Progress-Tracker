import { Menu, Search } from "lucide-react";

import { Button } from "@/components/ui/button";

export function TopNavigation() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/80 bg-background/88 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation">
          <Menu className="size-5" />
        </Button>
        <div>
          <p className="text-sm font-medium text-foreground">Workspace</p>
          <p className="text-xs text-muted-foreground">Personal academic operating system</p>
        </div>
      </div>

      <Button variant="secondary" className="hidden h-9 gap-2 px-3 text-muted-foreground sm:inline-flex">
        <Search className="size-4" />
        <span className="text-sm">Search</span>
      </Button>
    </header>
  );
}
