"use client";

import moment from "moment";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Track, UserTablesProps } from "@/types/track";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";
import { RefreshCcw, Loader2, Package } from "lucide-react";

const UserTables: React.FC<UserTablesProps> = ({ searchFor }) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [userTracks, setUserTracks] = useState<Track[]>([]);
  const [filtered, setFiltered] = useState<Track[]>([]);

  // ✅ Fetch user tracks once
  useEffect(() => {
    const fetchUserTracks = async () => {
      if (!user?._id) return;
      try {
        setLoading(true);
        const res = await api.get(`/track/user/${user._id}`);
        const data = Array.isArray(res.data.data)
          ? res.data.data
          : Array.isArray(res.data)
          ? res.data
          : [];
        setUserTracks(data);
        setFiltered(data);
      } catch (error) {
        console.error("❌ Failed to fetch user tracks:", error);
        toast.error("Тээврийн мэдээлэл ачааллахад алдаа гарлаа.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserTracks();
  }, [user?._id]);

  // ✅ Filter tracks by selected status
  useEffect(() => {
    if (!searchFor) setFiltered(userTracks);
    else setFiltered(userTracks.filter((d) => d.status === searchFor));
  }, [searchFor, userTracks]);

  const handleRefresh = () => {
    setFiltered(userTracks);
    toast.success("Жагсаалт шинэчлэгдлээ");
  };

  return (
    <div className="mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
      <div className="flex w-full justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Захиалгын жагсаалт
        </h2>
        <button
          className="flex items-center gap-2 justify-center h-8 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          onClick={handleRefresh}
        >
          <RefreshCcw className="w-4 h-4" />
          <span className="hidden sm:inline text-sm">Шинэчлэх</span>
        </button>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex justify-center items-center h-40 text-gray-500">
          <Loader2 className="animate-spin w-5 h-5 mr-2" />
          Тээврийн мэдээлэл ачааллаж байна...
        </div>
      ) : filtered.length === 0 ? (
        // Empty state
        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
          <Package className="mx-auto mb-3 h-8 w-8 opacity-70" />
          <p>Тээврийн бүртгэл олдсонгүй.</p>
        </div>
      ) : (
        // Table
        <Table>
          <TableCaption>Таны сүүлийн захиалгууд</TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              <TableHead className="text-center w-[60px]">№</TableHead>
              <TableHead className="text-center w-[180px]">
                Захиалгын №
              </TableHead>
              <TableHead className="text-center w-[185px]">Статус</TableHead>
              <TableHead className="text-center w-[160px]">Байршил</TableHead>
              <TableHead className="text-center w-[160px]">Огноо</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtered.map((track, i) => (
              <TableRow
                key={track._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <TableCell className="text-center font-medium">
                  {i + 1}
                </TableCell>
                <TableCell className="text-center font-mono">
                  {track.trackingNumber}
                </TableCell>
                <TableCell className="text-center font-semibold text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      track.status === "Хүргэгдсэн"
                        ? "bg-green-100 text-green-700"
                        : [
                            "Хятадад байгаа",
                            "Эрээнд ирсэн",
                            "Монголд ирсэн",
                            "Улаанбаатарт ирсэн",
                            "Салбарт очсон",
                          ].includes(track.status)
                        ? "bg-blue-100 text-blue-700"
                        : track.status === "Саатсан"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {track.status}
                  </span>
                </TableCell>
                <TableCell className="text-center">{track.location}</TableCell>
                <TableCell className="text-center text-gray-500 dark:text-gray-400">
                  {moment(track.createdAt).format("YYYY/MM/DD")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter />
        </Table>
      )}
    </div>
  );
};

export default UserTables;
