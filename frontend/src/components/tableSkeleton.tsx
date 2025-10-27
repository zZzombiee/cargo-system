"use client";

import { Skeleton } from "@/components/ui/skeleton";

const TableSkeleton = () => {
  return (
    <div className="flex flex-col ">
      {/* Top Bar (Filter + Buttons) */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-28 rounded-md" />{" "}
          {/* Dropdown (All Tracks) */}
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-32 rounded-md" /> {/* Customize Columns */}
          <Skeleton className="h-8 w-28 rounded-md" /> {/* Add Section */}
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden mb-3">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-100">
            <tr>
              {Array.from({ length: 8 }).map((_, i) => (
                <th key={i} className="p-3 text-left">
                  <Skeleton className="h-4 w-3" />
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="border-t">
                <td className="p-3">
                  <Skeleton className="h-6 w-3" />
                </td>
                <td className="p-3">
                  <Skeleton className="h-6 w-40" />
                </td>
                <td className="p-3">
                  <Skeleton className="h-6 w-28" />
                </td>
                <td className="p-3">
                  <Skeleton className="h-6 w-28" />
                </td>
                <td className="p-3">
                  <Skeleton className="h-6 w-10" />
                </td>
                <td className="p-3">
                  <Skeleton className="h-6 w-10" />
                </td>
                <td className="p-3">
                  <Skeleton className="h-6 w-24" />
                </td>
                <td className="p-3">
                  <Skeleton className="h-6 w-4" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer (pagination area) */}
      <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
        <Skeleton className="h-4 w-32" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-32" />
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;
