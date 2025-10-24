"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ReportsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Тайлан</h1>
      <Card>
        <CardHeader>
          <CardTitle>Борлуулалтын тойм</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">
            Энд борлуулалтын график болон тайлан байрлана.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
