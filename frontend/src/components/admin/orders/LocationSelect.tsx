import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Order, PropsLocation, statusLocationMap } from "@/types/order";

const LocationSelect = ({ order, updateOrder }: PropsLocation) => (
  <Select
    value={order.location}
    onValueChange={(v) =>
      updateOrder(order._id, { location: v as Order["location"] })
    }
  >
    <SelectTrigger className="w-[140px] mx-auto">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      {(statusLocationMap[order.status] || []).map((loc) => (
        <SelectItem key={loc} value={loc}>
          {loc}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default LocationSelect;
