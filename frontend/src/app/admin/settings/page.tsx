"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Тохиргоо</h1>
      <div className="max-w-md space-y-3">
        <Input placeholder="Админ нэр" />
        <Input placeholder="Имэйл" type="email" />
        <Input placeholder="Нууц үг" type="password" />
        <Button>Хадгалах</Button>
      </div>
    </div>
  );
}
