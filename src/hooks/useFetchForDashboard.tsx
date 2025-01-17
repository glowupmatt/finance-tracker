import { User } from "@/types/UserTypes";
import { calculateTotal } from "@/utils/calculateTotal";
import { Budget, RecurringPayment, Transaction } from "@prisma/client";
import { Pot } from "@/types/PotTypes";
import { useEffect, useState } from "react";

export function useFetchForDashboard(
  user: User | undefined,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  const [transactions, setTransactions] = useState<Transaction[] | undefined>(
    undefined
  );
  const [isUserUpdated, setIsUserUpdated] = useState(true);
  const [pots, setPots] = useState<Pot[] | undefined>(undefined);
  const [budgets, setBudgets] = useState<Budget[] | undefined>(undefined);
  const [recurringPayments, setRecurringPayments] = useState<
    RecurringPayment[] | undefined
  >([]);
  const [currentBalance, setCurrentBalance] = useState<number | undefined>(
    undefined
  );
  const [totalIncome, setTotalIncome] = useState<number | undefined>(undefined);
  const [totalExpense, setTotalExpense] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    if (user !== undefined) {
      setTransactions(user.transactions);
      setPots(user.pots);
      setBudgets(user.budgets);
      setRecurringPayments(user?.recurringPayments);
    }
  }, [user, isUserUpdated]);

  useEffect(() => {
    if (transactions !== undefined) {
      const income = calculateTotal(transactions, "INCOME");
      const expense = calculateTotal(transactions, "EXPENSE");
      const savings = calculateTotal(transactions, "SAVINGS");
      if (
        income !== undefined &&
        expense !== undefined &&
        savings !== undefined
      ) {
        setCurrentBalance(income + savings - expense);
      } else {
        setCurrentBalance(undefined);
      }
      setTotalIncome(calculateTotal(transactions, "INCOME"));
      setTotalExpense(calculateTotal(transactions, "EXPENSE"));
      setIsLoading(false);
    }
  }, [transactions, user, setIsLoading, isUserUpdated]);

  return {
    transactions,
    pots,
    budgets,
    recurringPayments,
    currentBalance,
    totalIncome,
    totalExpense,
    isUserUpdated,
    setIsUserUpdated,
  };
}
