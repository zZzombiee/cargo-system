export const statusList = [
  "Бүртгүүлсэн",
  "Эрээнд ирсэн",
  "Монголд ирсэн",
  "Хүргэгдсэн",
  "Саатсан",
  "Цуцалсан",
] as const;

export type Status = (typeof statusList)[number];

export type Location = "Улаанбаатар" | "Эрээн" | "Замын-Үүд" | "Хятад";

export interface Order {
  _id: string;
  orderNumber: string;
  price: number;
  status: Status;
  location: Location;
  weight: number;
  createdAt: string;
}

export interface SearchOrder {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

export interface SearchOrderProps {
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

export interface Order {
  _id: string;
  orderNumber: string;
  price: number;

  status:
    | "Бүртгүүлсэн"
    | "Эрээнд ирсэн"
    | "Монголд ирсэн"
    | "Хүргэгдсэн"
    | "Саатсан"
    | "Цуцалсан";
  location: "Улаанбаатар" | "Эрээн" | "Замын-Үүд" | "Хятад";
  createdAt: string;
}

export interface UserTablesProps {
  searchFor: Status | "";
}

export interface DropdownItem {
  label: string;
  onClick?: () => void;
}

export interface DropdownProps {
  name: string;
  menuItems: (string | DropdownItem)[];
  onItemClick?: (item: string) => void;
}
export interface PropsHeader {
  searchFor: Status | "";
  setSearchFor: (s: Status | "") => void;
  statusList: readonly Status[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}
export interface PropsRow {
  order: Order;
  index: number;
  ordersCount: number;
  updateOrder: (id: string, data: Partial<Order>) => void;
}

export interface PropsStatus {
  order: Order;
  updateOrder: (id: string, data: Partial<Order>) => void;
}

export const statusLocationMap: Record<Order["status"], Order["location"][]> = {
  Бүртгүүлсэн: ["Хятад"],
  "Эрээнд ирсэн": ["Эрээн"],
  "Монголд ирсэн": ["Замын-Үүд", "Улаанбаатар"],
  Хүргэгдсэн: ["Улаанбаатар"],
  Саатсан: ["Эрээн", "Замын-Үүд", "Улаанбаатар"],
  Цуцалсан: ["Хятад", "Эрээн", "Замын-Үүд", "Улаанбаатар"],
};

export interface PropsLocation {
  order: Order;
  updateOrder: (id: string, data: Partial<Order>) => void;
}
