"use client";

import Tab from "@/components/admin/tabs";
import { useAdminGuard } from "@/hooks/useAdminGuard";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

const AdminPage = () => {
  const { isChecking } = useAdminGuard();

  if (isChecking) {
    return (
      <div className="flex justify-center items-end h-[40vh]">
        <Spinner variant={"ring"} size={64} />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col max-w-7xl mx-auto mt-4">
      <p className="text-2xl font-extrabold px-4 md:px-6 lg:mx-auto">
        Admin Page
      </p>
      <Tab />
    </div>
  );
};

export default AdminPage;
