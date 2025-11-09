// =======================
// 📦 STATUS & LOCATION
// =======================
export const statusList = [
  "Хятадад байгаа",
  "Хятадаас гарсан",
  "Монголд ирсэн",
  "Салбарт очсон",
  "Саатсан",
  "Хүргэгдсэн",
] as const;

export type Status = (typeof statusList)[number];

export const locationList = [
  "Хятад",
  "Эрээн",
  "Замын-Үүд",
  "Улаанбаатар",
  "Салбар1",
  "Салбар2",
  "Салбар3",
] as const;

export type Location = (typeof locationList)[number];

// ✅ Location → Status mapping
export const locationStatusMap: Record<Location, Status> = {
  Хятад: "Хятадад байгаа",
  Эрээн: "Хятадад байгаа",
  "Замын-Үүд": "Монголд ирсэн",
  Улаанбаатар: "Монголд ирсэн",
  Салбар1: "Салбарт очсон",
  Салбар2: "Салбарт очсон",
  Салбар3: "Салбарт очсон",
};

// ✅ Optional reverse mapping if needed (Status → Locations)
export const statusLocationMap: Record<Status, Location[]> = {
  "Хятадад байгаа": ["Хятад", "Эрээн"],
  "Хятадаас гарсан": ["Эрээн"],
  "Монголд ирсэн": ["Замын-Үүд", "Улаанбаатар"],
  "Салбарт очсон": ["Салбар1", "Салбар2", "Салбар3"],
  Саатсан: ["Эрээн", "Замын-Үүд", "Улаанбаатар"],
  Хүргэгдсэн: ["Улаанбаатар"],
};

// =======================
// 📦 SHARED INTERFACES
// =======================

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

export interface PropsLocation {
  order: Order;
  updateOrder: (id: string, data: Partial<Order>) => void;
}

export interface PropsDetail {
  order: Order;
  open: boolean;
  setOpen: (open: boolean) => void;
}

// =======================
// 📦 TRACK MODEL SYNC
// =======================
export interface Track {
  trackingNumber: string;
  location: Location;
  status: Status;
  price?: number;
  weight?: number;
  user?: string;
  statusHistory?: {
    status: Status;
    updatedAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
