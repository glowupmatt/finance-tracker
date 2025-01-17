"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { Transaction } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { usePots } from "./PotsContext";

interface TransactionsContextType {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  isTransactionsUpdated: boolean;
  setIsTransactionsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  transactionPagination: Transaction[];
  setTransactionPagination: React.Dispatch<React.SetStateAction<Transaction[]>>;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  maxPages: number;
  setMaxPages: React.Dispatch<React.SetStateAction<number>>;
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(
  undefined
);

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error(
      "useTransactions must be used within a TransactionsProvider"
    );
  }
  return context;
};

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsProvider = ({
  children,
}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isTransactionsUpdated, setIsTransactionsUpdated] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [transactionPagination, setTransactionPagination] = useState<
    Transaction[]
  >([]);
  const [maxPages, setMaxPages] = useState(0);
  const { isPotsUpdated } = usePots();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: _, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch("/api/transactions", {
          method: "GET",
        });
        const data = await response.json();

        setTransactions(data.transactions);
      } catch (error) {
        console.log(error);
      }
    }
    if (status !== "authenticated" && status !== "loading") {
      router.push("/session");
    } else {
      fetchTransactions();
    }
  }, [isTransactionsUpdated, router, status, isPotsUpdated]);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch(
          `/api/transactions?page=${page}&pageSize=${limit}`
        );
        const data = await response.json();
        setTransactionPagination(data.transactions);
        setTotalPages(data.pagination.totalPages);
        setMaxPages(data.pagination.totalPages);
      } catch (error) {
        console.log(error);
      }
    }
    if (status !== "authenticated" && status !== "loading") {
      router.push("/session");
    } else {
      fetchTransactions();
    }
  }, [
    page,
    limit,
    totalPages,
    isTransactionsUpdated,
    isPotsUpdated,
    router,
    status,
  ]);

  const contextValue = {
    transactions,
    setTransactions,
    isTransactionsUpdated,
    setIsTransactionsUpdated,
    page,
    setPage,
    limit,
    setLimit,
    totalPages,
    setTotalPages,
    transactionPagination,
    setTransactionPagination,
    maxPages,
    setMaxPages,
  };
  return (
    <TransactionsContext.Provider value={contextValue}>
      {children}
    </TransactionsContext.Provider>
  );
};
