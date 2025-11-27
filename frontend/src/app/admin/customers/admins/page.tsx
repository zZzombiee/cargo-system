"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { columns, User } from "@/components/admin/userDataTable/columns";
import { DataTable } from "@/components/admin/userDataTable/dataTable";

const Page = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchCustomers = async () => {
    try {
      const res = await api.get("/user");
      const all = res.data.data || res.data.users || [];
      setUsers(all.filter((user: { role: string }) => user.role === "admin"));
    } catch (err) {
      console.error("❌ Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="px-10">
      <DataTable columns={columns} data={users} onRefresh={fetchCustomers} />
    </div>
  );
};

export default Page;
