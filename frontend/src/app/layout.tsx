import { UserProvider } from "@/context/UserContext";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/context/ThemeProvider";
import { TrackProvider } from "@/context/TrackContext";

export const metadata = {
  title: "GoCargo",
  description: "Cargo Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>
            <TrackProvider>
              <div className="flex flex-col min-h-screen w-full">
                <main className="flex-grow container ">{children}</main>
                <Toaster position="bottom-right" richColors />
              </div>
            </TrackProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
