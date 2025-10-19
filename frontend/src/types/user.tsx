export interface User {
  _id?: string;
  email: string;
  name: string;
  number?: string;
  role?: string;
}

export interface UserContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    data: Omit<User, "_id" | "role"> & { password: string }
  ) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}
