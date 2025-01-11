"use client";
import React, {
  useState,
  useContext,
  createContext,
  // Dispatch,
  // SetStateAction,
  useEffect,
} from "react";
import { Transaction, Budget, RecurringPayment } from "@prisma/client";
import { Pot } from "@/types/PotTypes";
import { useSession } from "next-auth/react";
import {
  fetchBudgets,
  fetchPots,
  fetchRecurringPayments,
  fetchTransactions,
} from "@/lib/fetchUserActions";
import { calculateTotal } from "@/utils/calculateTotal";
import { useRouter } from "next/navigation";

type UserContextType = {
  transactions: Transaction[] | undefined;
  pots: Pot[] | undefined;
  budgets: Budget[] | undefined;
  recurringPayments: RecurringPayment[] | undefined;
  currentBalance: number | undefined;
  totalIncome: number | undefined;
  totalExpense: number | undefined;
  isLoading?: boolean;
};

type Props = {
  children: React.ReactNode;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

export const UserProvider = ({ children }: Props) => {
  const [transactions, setTransactions] = useState<Transaction[] | undefined>(
    undefined
  );
  const [pots, setPots] = useState<Pot[] | undefined>(undefined);
  const [budgets, setBudgets] = useState<Budget[] | undefined>(undefined);
  const [recurringPayments, setRecurringPayments] = useState<
    RecurringPayment[]
  >([]);
  const [currentBalance, setCurrentBalance] = useState<number | undefined>(
    undefined
  );
  const [totalIncome, setTotalIncome] = useState<number | undefined>(undefined);
  const [totalExpense, setTotalExpense] = useState<number | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "authenticated" && status !== "loading") {
      router.push("/");
    }
  }, [router, status]);

  useEffect(() => {
    if (status === "authenticated") {
      try {
        fetchTransactions().then((data) => setTransactions(data));
        fetchPots().then((data) => setPots(data));
        fetchBudgets().then((data) => setBudgets(data));
        fetchRecurringPayments().then((data) => setRecurringPayments(data));
      } catch (error) {
        console.log(error);
      }
    }
  }, [status]);

  useEffect(() => {
    if (transactions !== undefined) {
      const income = calculateTotal(transactions, "INCOME");
      const expense = calculateTotal(transactions, "EXPENSE");
      if (income !== undefined && expense !== undefined) {
        setCurrentBalance(income - expense);
      } else {
        setCurrentBalance(undefined);
      }
      setTotalIncome(calculateTotal(transactions, "INCOME"));
      setTotalExpense(calculateTotal(transactions, "EXPENSE"));
      setIsLoading(false);
    }
  }, [transactions]);

  const data = {
    transactions,
    pots,
    budgets,
    recurringPayments,
    currentBalance,
    totalIncome,
    totalExpense,
    isLoading,
  };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};
