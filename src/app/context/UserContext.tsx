"use client";
import React, {
  useState,
  useContext,
  createContext,
  // Dispatch,
  // SetStateAction,
  useEffect,
} from "react";
import { Transaction, Pot, Budget, RecurringPayment } from "@prisma/client";
import { useSession } from "next-auth/react";

type UserContextType = {
  transactions: Transaction[];
  pots: Pot[];
  budgets: Budget[];
  recurringPayments: RecurringPayment[];
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
  const session = useSession();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pots, setPots] = useState<Pot[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [recurringPayments, setRecurringPayments] = useState<
    RecurringPayment[]
  >([]);

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
    async function fetchPots() {
      try {
        const response = await fetch("/api/pots");
        const data = await response.json();
        setPots(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchBudgets() {
      try {
        const response = await fetch("/api/budgets");
        const data = await response.json();
        setBudgets(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchRecurringPayments() {
      try {
        const response = await fetch("/api/recurringPayments");
        const data = await response.json();
        setRecurringPayments(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    if (session.status === "authenticated") {
      fetchTransactions();
      fetchPots();
      fetchBudgets();
      fetchRecurringPayments();
    }
  }, [session]);

  const data = {
    transactions,
    pots,
    budgets,
    recurringPayments,
  };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};
