"use client";
import React, {
  useState,
  useContext,
  createContext,
  // Dispatch,
  // SetStateAction,
  useEffect,
} from "react";
import { Transaction, Budget, RecurringPayment, User } from "@prisma/client";
import { Pot } from "@/types/PotTypes";
import { useSession } from "next-auth/react";
import {
  fetchBudgets,
  fetchPots,
  fetchRecurringPayments,
  fetchTransactions,
  fetchUserActions,
} from "@/lib/fetchUserActions";
import { calculateTotal } from "@/utils/calculateTotal";
import { useRouter } from "next/navigation";

type UserContextType = {
  transactions: Transaction[] | undefined;
  pots: Pot[] | undefined;
  budgets: Budget[] | undefined;
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  recurringPayments: RecurringPayment[] | undefined;
  currentBalance: number | undefined;
  totalIncome: number | undefined;
  totalExpense: number | undefined;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  transactionPages: number | undefined;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
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
  const [transactionPages, setTransactionPages] = useState<number | undefined>(
    0
  );
  const [currentPage, setCurrentPage] = useState(1);
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

  const [user, setUser] = useState<User | undefined>(undefined);

  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "authenticated" && status !== "loading") {
      router.push("/session");
    }
  }, [router, status]);

  useEffect(() => {
    if (status === "authenticated") {
      try {
        fetchTransactions(currentPage, 10).then((data) => {
          setTransactions(data.transactions);
          setTransactionPages(data.pagination.totalPages);
        });
        fetchPots().then((data) => setPots(data));
        fetchBudgets().then((data) => setBudgets(data));
        fetchRecurringPayments().then((data) => setRecurringPayments(data));
        fetchUserActions().then((data) => setUser(data));
      } catch (error) {
        console.log(error);
      }
    }
  }, [status, currentPage]);

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
    user,
    setUser,
    setIsLoading,
    transactionPages,
    currentPage,
    setCurrentPage,
  };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};
