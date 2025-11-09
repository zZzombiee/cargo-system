import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import SearchOrder from "../searchOrder";
import { Status, PropsHeader } from "@/types/order";

const OrdersTableHeader = ({
  searchFor,
  setSearchFor,
  statusList,
  setOrders,
}: PropsHeader) => (
  <TableHeader>
    <TableRow className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
      <TableHead className="text-center w-[60px]">№</TableHead>
      <TableHead className="text-center w-[180px] flex justify-center items-center">
        <SearchOrder setOrders={setOrders} />
      </TableHead>
      <TableHead className="text-center w-[120px]">Үнэ (₮)</TableHead>
      <TableHead className="text-center w-[120px]">Жин (кг)</TableHead>
      <TableHead className="text-center w-[185px]">
        <Select
          value={searchFor || "all"}
          onValueChange={(value) =>
            setSearchFor(value === "all" ? "" : (value as Status))
          }
        >
          <SelectTrigger className="w-full border-0 shadow-none">
            <SelectValue placeholder="Төлөв" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Төлөв</SelectItem>
            {statusList.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableHead>
      <TableHead className="text-center w-[160px]">Байршил</TableHead>
      <TableHead className="text-center w-[160px]">Огноо</TableHead>
    </TableRow>
  </TableHeader>
);

export default OrdersTableHeader;
