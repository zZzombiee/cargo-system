"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useTrack } from "@/context/TrackContext";

export default function AdminDashboardPage() {
  const { allTracks, fetchAllTracks, loading } = useTrack();

  return (
    <div className="p-6 space-y-6">
      <Card className="shadow-lg">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold">
            📦 Cargo Tracking Data
          </CardTitle>
          <Button variant="outline" size="sm" onClick={fetchAllTracks}>
            Refresh
          </Button>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p className="text-center py-10 text-gray-500">Loading...</p>
          ) : allTracks.length === 0 ? (
            <p className="text-center py-10 text-gray-500">
              No cargo tracks found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="text-center">
                    <TableHead className="min-w-[100px]">Order #</TableHead>
                    <TableHead className="text-center">Track Number</TableHead>
                    <TableHead className="text-center">Price</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Weight</TableHead>
                    <TableHead className="text-center">Location</TableHead>
                    <TableHead className="text-center">Date</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {allTracks.map((track, index) => (
                    <TableRow
                      key={track._id}
                      className="hover:bg-muted/50 transition-colors text-center"
                    >
                      <TableCell>{allTracks.length - index}</TableCell>
                      <TableCell>{track.trackingNumber}</TableCell>
                      <TableCell>
                        {track.price === 0 ? "-" : track.price}
                      </TableCell>
                      <TableCell>{track.location}</TableCell>
                      <TableCell>
                        {track.weight === 0 ? "-" : track.weight}
                      </TableCell>
                      <TableCell>
                        {(() => {
                          const statusClassMap: Record<string, string> = {
                            Хүргэгдсэн: "bg-green-100 text-green-700",
                            Саатсан: "bg-yellow-100 text-yellow-700",
                          };
                          const statusClass =
                            statusClassMap[String(track.status)] ??
                            "bg-gray-100 text-gray-700";
                          return (
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${statusClass}`}
                            >
                              {track.status}
                            </span>
                          );
                        })()}
                      </TableCell>
                      <TableCell>
                        {new Date(track.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <Eye className="w-4 h-4" /> View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
