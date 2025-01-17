/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { Budget } from "@/types/BudgetTypes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface BudgetsContextType {
  budgets: Budget[];
  setBudgets: React.Dispatch<React.SetStateAction<Budget[]>>;
  isBudgetsUpdated: boolean;
  setIsBudgetsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

const BudgetsContext = createContext<BudgetsContextType | undefined>(undefined);

export const useBudgets = () => {
  const context = useContext(BudgetsContext);
  if (!context) {
    throw new Error("useBudgets must be used within a BudgetsProvider");
  }
  return context;
};

interface BudgetsProviderProps {
  children: ReactNode;
}

export const BudgetsProvider = ({ children }: BudgetsProviderProps) => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isBudgetsUpdated, setIsBudgetsUpdated] = useState(false);
  const { data: _, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    async function fetchBudgets() {
      try {
        const response = await fetch("/api/budgets", {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        });
        const data = await response.json();

        setBudgets(data.budgets);
      } catch (error) {
        console.log(error);
      }
    }
    if (status !== "authenticated" && status !== "loading") {
      router.push("/session");
    } else {
      fetchBudgets();
    }
  }, [isBudgetsUpdated, router, status]);

  const contextValue = {
    budgets,
    setBudgets,
    isBudgetsUpdated,
    setIsBudgetsUpdated,
  };
  return (
    <BudgetsContext.Provider value={contextValue}>
      {children}
    </BudgetsContext.Provider>
  );
};
