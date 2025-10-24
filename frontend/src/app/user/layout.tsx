import Header from "@/components/header";
import "../globals.css";
import Footer from "@/components/footer";

export default function FullWidthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-w-screen min-h-screen w-full justify-between">
      <Header />
      <main> {children}</main>
      <Footer />
    </div>
  );
}
