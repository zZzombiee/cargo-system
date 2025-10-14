"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import Search from "@/components/search";

const UserPage = () => {
  return (
    <div className="flex flex-col items-center w-screen min-h-screen justify-between">
      <Header />
      <Search />
      <Footer />
    </div>
  );
};

export default UserPage;
