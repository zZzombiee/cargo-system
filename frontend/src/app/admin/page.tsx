"use client";

import { useEffect, useState } from "react";
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
import { toast } from "sonner";

// Example data type
interface Track {
  id: string;
  orderNumber: string;
  senderName: string;
  receiverName: string;
  cargoType: string;
  weight: string;
  status: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: replace with real API call
    const fetchTracks = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/tracks");
        if (!res.ok) throw new Error("Failed to load data");
        const data = await res.json();
        setTracks(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, []);

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Cargo Tracking Data</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : tracks.length === 0 ? (
            <p>No tracks found</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Order #</TableHead>
                  <TableHead>Sender</TableHead>
                  <TableHead>Receiver</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tracks.map((track) => (
                  <TableRow key={track.id}>
                    <TableCell>{track.id}</TableCell>
                    <TableCell>{track.orderNumber}</TableCell>
                    <TableCell>{track.senderName}</TableCell>
                    <TableCell>{track.receiverName}</TableCell>
                    <TableCell>{track.cargoType}</TableCell>
                    <TableCell>{track.weight}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          track.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : track.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {track.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(track.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
