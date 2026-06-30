import type { ReactNode } from "react";

import { Sidebar } from "@/components/layout/sidebar";
import { TopNavigation } from "@/components/layout/top-navigation";

export function AppShell({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="min-h-screen lg:pl-[260px]">
        <TopNavigation />
        <main className="min-h-[calc(100vh-68px)] px-4 py-8 sm:px-6 lg:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}
