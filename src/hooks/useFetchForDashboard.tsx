import { User } from "@/types/UserTypes";
import { RecurringPayment, Transaction } from "@prisma/client";
import { useEffect, useState } from "react";

export function useFetchForDashboard(user: User | undefined) {
  const [transactions, setTransactions] = useState<Transaction[] | undefined>(
    undefined
  );
  const [isUserUpdated, setIsUserUpdated] = useState(true);
  const [recurringPayments, setRecurringPayments] = useState<
    RecurringPayment[] | undefined
  >([]);

  useEffect(() => {
    if (user !== undefined) {
      setTransactions(user.transactions);
      setRecurringPayments(user?.recurringPayments);
    }
  }, [user, isUserUpdated]);

  return {
    transactions,
    recurringPayments,
    isUserUpdated,
    setIsUserUpdated,
  };
}
