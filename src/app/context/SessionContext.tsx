"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useContext,
} from "react";
import { User } from "@prisma/client";

type SessionContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

type props = {
  children: React.ReactNode;
};

export const SessionContext = createContext<SessionContextType | null>(null);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

export const SessionProvider = ({ children }: props) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <SessionContext.Provider value={{ user, setUser }}>
      {children}
    </SessionContext.Provider>
  );
};
