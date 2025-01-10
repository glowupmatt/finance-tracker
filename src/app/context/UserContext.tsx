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
import { useSession } from "next-auth/react";

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
  const session = useSession();
  // const [pots, setPots] = useState<Pot[]>([]);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch("/api/transactions");
        const data = await response.json();
        setTransactions(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    if (session.status === "authenticated") {
      fetchTransactions();
    }
    // async function fetchPots() {
    //   try {
    //     const response = await fetch("/api/pots");
    //     const data = await response.json();
    //     setPots(data);
    //     console.log(data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // fetchPots();
  }, [session]);

  const data = {
    transactions,
  };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};
