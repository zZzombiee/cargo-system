"use client";

import Profile from "@/components/client/profile";
import UserTables from "@/components/client/userTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Status, statusList } from "@/types/track";

const TracksPage = () => {
  const [searchFor, setSearchFor] = useState<Status | "">("");

  return (
    <div className="flex flex-col md:flex-row md:gap-10 p-4 md:p-10 max-w-7xl mx-auto">
      <div className="hidden md:flex md:w-1/4 lg:w-1/5">
        <Profile />
      </div>

      <div className="flex flex-col w-full md:w-3/4 lg:w-4/5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
          <Select
            value={searchFor}
            onValueChange={(value) => setSearchFor(value as Status)}
          >
            <SelectTrigger className="w-full sm:w-[220px] shadow-md">
              <SelectValue placeholder="Статус сонгох" />
            </SelectTrigger>
            <SelectContent>
              {statusList.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mt-8">
          <UserTables searchFor={searchFor || ""} />
        </div>
      </div>
    </div>
  );
};

export default TracksPage;
