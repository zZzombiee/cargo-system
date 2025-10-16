import Tab from "@/components/tabs";

const AdminPage = () => {
  return (
    <div className="flex w-full flex-col gap-3 max-w-7xl mx-auto my-10">
      <p className="text-4xl font-extrabold px-4 md:px-6 lg:mx-auto">
        Admin Page
      </p>
      <Tab />
    </div>
  );
};

export default AdminPage;
