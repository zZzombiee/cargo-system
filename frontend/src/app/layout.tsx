import { UserProvider } from "@/context/UserContext";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/context/ThemeProvider";
import Footer from "@/components/footer";
import Header from "@/components/header";

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
            <div className="flex flex-col min-h-screen w-full">
              <Header />
              <main className="flex-grow">{children}</main>

              <Toaster position="bottom-right" richColors />
              <Footer />
            </div>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
