import moment from "moment";
import { TableCell, TableRow } from "@/components/ui/table";
import { PropsRow } from "@/types/order";
import StatusSelect from "./StatusSelect";
import LocationSelect from "./LocationSelect";

const OrdersTableRow = ({
  order,
  index,
  ordersCount,
  updateOrder,
}: PropsRow) => (
  <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
    <TableCell className="text-center font-medium">
      {ordersCount - index}
    </TableCell>
    <TableCell className="text-center font-mono">{order.orderNumber}</TableCell>
    <TableCell className="text-center">
      {new Intl.NumberFormat("mn-MN").format(order.price)} ₮
    </TableCell>
    <TableCell className="text-center">
      {new Intl.NumberFormat("mn-MN").format(order.weight)} кг
    </TableCell>
    <TableCell className="text-center">
      <StatusSelect order={order} updateOrder={updateOrder} />
    </TableCell>
    <TableCell className="text-center">
      <LocationSelect order={order} updateOrder={updateOrder} />
    </TableCell>
    <TableCell className="text-center text-gray-500 dark:text-gray-400">
      {moment(order.createdAt).format("YYYY/MM/DD")}
    </TableCell>
  </TableRow>
);

export default OrdersTableRow;
