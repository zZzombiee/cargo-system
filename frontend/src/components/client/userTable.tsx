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
import { UserTablesProps } from "@/types/order";
import { useTrack } from "@/context/TrackContext";

const UserTables: React.FC<UserTablesProps> = ({ searchFor }) => {
  const { userTracks } = useTrack();
  const searchStatus = searchFor as unknown as
    | (typeof userTracks)[number]["status"]
    | undefined;
  const filtered = searchStatus
    ? userTracks.filter((d) => d.status === searchStatus)
    : userTracks;

  return (
    <div className="mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md border max-w-screen">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Захиалгын жагсаалт
      </h2>

      <Table>
        <TableCaption>Таны сүүлийн захиалгууд</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
            <TableHead className="text-center w-[60px]">№</TableHead>
            <TableHead className="text-center w-[180px]">Захиалгын №</TableHead>
            {/* <TableHead className="text-center w-[120px]">Үнэ (₮)</TableHead> */}
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
              <TableCell className="text-center font-medium">{i + 1}</TableCell>
              <TableCell className="text-center font-mono">
                {track.trackingNumber}
              </TableCell>
              {/* <TableCell className="text-center">
                {new Intl.NumberFormat("mn-MN").format(track.price)} ₮
              </TableCell> */}

              <TableCell className="text-center">{track.status}</TableCell>

              <TableCell className="text-center">{track.location}</TableCell>

              <TableCell className="text-center text-gray-500 dark:text-gray-400">
                {moment(track.createdAt).format("YYYY/MM/DD")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter />
      </Table>
    </div>
  );
};

export default UserTables;
