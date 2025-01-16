"use client";
import React, { useState, useContext, createContext, useEffect } from "react";
import { User } from "@/types/UserTypes";
import { Transaction, RecurringPayment } from "@prisma/client";
import { Pot } from "@/types/PotTypes";
import { useFetchForDashboard } from "@/hooks/useFetchForDashboard";
import { Budget } from "@/types/BudgetTypes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchUserActions } from "@/lib/fetchUserActions";

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
  isUpdated: boolean;
  setIsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isUpdated, setIsUpdated] = useState(true);
  const router = useRouter();
  const { data: session, status } = useSession();

  const {
    transactions,
    pots,
    budgets,
    recurringPayments,
    currentBalance,
    totalIncome,
    totalExpense,
  } = useFetchForDashboard(user, setIsLoading);

  useEffect(() => {
    if (status !== "authenticated" && status !== "loading") {
      router.push("/session");
    } else {
      if (status === "authenticated") {
        setIsLoading(true);
        fetchUserActions(session.user?.email as string)
          .then((data) => {
            setUser(data?.user);
          })
          .catch((error) => {
            console.error("Error fetching user actions:", error);
          });
      }
    }
  }, [router, status, session]);

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
    isUpdated,
    setIsUpdated,
  };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};
