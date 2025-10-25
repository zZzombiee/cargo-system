"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import api from "@/lib/axios";

interface Customer {
  _id: string;
  name: string;
  email: string;
  number?: string;
  role?: string;
}

export default function CustomersPage() {
  const [admins, setAdmins] = useState<Customer[]>([]);
  const [users, setUsers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/user");
      const all = res.data.data || res.data.users || [];

      const adminList = all.filter((c: Customer) => c.role === "admin");
      const userList = all.filter((c: Customer) => c.role === "user");

      setAdmins(adminList);
      setUsers(userList);
    } catch (err) {
      console.error("❌ Error fetching users:", err);
      toast.error("Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Харилцагчид</h1>
        <p className="mt-4 text-gray-500">Loading customers...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-semibold">Харилцагчид</h1>

      {/* 🧑‍💼 Admin Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Админ</h2>
        {admins.length === 0 ? (
          <p className="text-gray-500">No admins found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {admins.map((c) => (
              <Card key={c._id}>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">
                    {c.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-500 space-y-1">
                  <p>📧 {c.email}</p>
                  {c.number && <p>📞 {c.number}</p>}
                  <p>🎯 Role: Admin</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* 👤 User Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Хэрэглэгчид</h2>
        {users.length === 0 ? (
          <p className="text-gray-500">No users found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((c) => (
              <Card key={c._id}>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">
                    {c.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-500 space-y-1">
                  <p>📧 {c.email}</p>
                  {c.number && <p>📞 {c.number}</p>}
                  <p>🎯 Role: User</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
