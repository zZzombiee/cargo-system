import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Order, PropsStatus, statusList } from "@/types/order";

const StatusSelect = ({ order, updateOrder }: PropsStatus) => (
  <Select
    value={order.status}
    onValueChange={(v) =>
      updateOrder(order._id, { status: v as Order["status"] })
    }
  >
    <SelectTrigger className="w-[165px] mx-auto">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      {statusList.map((s) => (
        <SelectItem key={s} value={s}>
          {s}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default StatusSelect;
