"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CustomersPage() {
  const customers = [
    { name: "Bat", email: "bat@example.com", phone: "99112233" },
    { name: "Bold", email: "bold@example.com", phone: "88003344" },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Харилцагчид</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {customers.map((c) => (
          <Card key={c.email}>
            <CardHeader>
              <CardTitle>{c.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-500 space-y-1">
              <p>📧 {c.email}</p>
              <p>📞 {c.phone}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
