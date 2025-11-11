export const statusList = [
  "Хятадад байгаа",
  "Эрээнд ирсэн",
  "Монголд ирсэн",
  "Улаанбаатарт ирсэн",
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

export const locationStatusMap: Record<Location, Status> = {
  Хятад: "Хятадад байгаа",
  Эрээн: "Хятадад байгаа",
  "Замын-Үүд": "Монголд ирсэн",
  Улаанбаатар: "Монголд ирсэн",
  Салбар1: "Салбарт очсон",
  Салбар2: "Салбарт очсон",
  Салбар3: "Салбарт очсон",
};

export const statusLocationMap: Record<Status, Location[]> = {
  "Хятадад байгаа": ["Хятад"],
  "Эрээнд ирсэн": ["Эрээн"],
  "Монголд ирсэн": ["Замын-Үүд"],
  "Улаанбаатарт ирсэн": ["Улаанбаатар"],
  "Салбарт очсон": ["Салбар1", "Салбар2", "Салбар3"],
  Саатсан: ["Эрээн", "Замын-Үүд", "Улаанбаатар"],
  Хүргэгдсэн: ["Улаанбаатар"],
};
export const statusColors: Record<Status, string> = {
  "Хятадад байгаа": "bg-gray-200 text-gray-800",
  "Эрээнд ирсэн": "bg-blue-100 text-blue-700",
  "Монголд ирсэн": "bg-yellow-100 text-yellow-700",
  "Улаанбаатарт ирсэн": "bg-purple-100 text-purple-700",
  "Салбарт очсон": "bg-indigo-100 text-indigo-700",
  Саатсан: "bg-red-100 text-red-700",
  Хүргэгдсэн: "bg-green-100 text-green-700",
};
export interface SearchTrack {
  tracks: Track[];
  setTracks: React.Dispatch<React.SetStateAction<Track[]>>;
}

export interface UserTablesProps {
  searchFor: Status | undefined;
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

export interface Track {
  _id: string;
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
