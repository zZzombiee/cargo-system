import { UserProvider } from "@/context/UserContext";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

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
    <html lang="en">
      <body>
        <UserProvider>
          {children}
          <Toaster position="bottom-right" richColors />
        </UserProvider>
      </body>
    </html>
  );
}
