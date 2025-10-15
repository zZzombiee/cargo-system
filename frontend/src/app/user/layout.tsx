import Footer from "@/components/footer";
import Header from "@/components/header";

export const metadata = {
  title: "GoCargo",
  description: "Cargo Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen w-full">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
