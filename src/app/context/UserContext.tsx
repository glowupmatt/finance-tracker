"use client";
import React, {
  useState,
  useContext,
  createContext,
  // Dispatch,
  // SetStateAction,
  useEffect,
} from "react";
import { Transaction } from "@prisma/client";

type UserContextType = {
  transactions: Transaction[];
};

type Props = {
  children: React.ReactNode;
};

export const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

export const UserProvider = ({ children }: Props) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch("/api/transactions");
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTransactions();
  }, []);

  const data = {
    transactions,
  };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};
