"use client";

import "../globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/sidebar/site-header";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@/context/UserContext";

export default function FullWidthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    if (user.role !== "admin") {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen min-w-screen">
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <main>{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
