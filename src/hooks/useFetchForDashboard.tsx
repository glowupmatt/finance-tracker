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
  }, [user]);

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
  }, [transactions, user, setIsLoading]);

  return {
    transactions,
    pots,
    budgets,
    recurringPayments,
    currentBalance,
    totalIncome,
    totalExpense,
  };
}
