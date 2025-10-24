import CargoAdminSidebar from "@/components/app-sidebar";
import "../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function FullWidthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        <CargoAdminSidebar />
        <div className="">
          <SidebarTrigger />
          <main className="flex-1">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
}
