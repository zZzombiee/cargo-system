export interface Track {
  trackingNumber: string;
  location:
    | "Хятад"
    | "Эрээн"
    | "Замын-Үүд"
    | "Улаанбаатар"
    | "Салбар1"
    | "Салбар2"
    | "Салбар3";
  status:
    | "Хятадад байгаа"
    | "Хятадаас гарсан"
    | "Монголд ирсэн"
    | "Салбарт очсон"
    | "Саатсан"
    | "Хүргэгдсэн";
  price?: number;
  weight?: number;
  user?: string;
  statusHistory?: {
    status: string;
    updatedAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
