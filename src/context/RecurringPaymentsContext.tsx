/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { RecurringPaymentType } from "@/types/RecurringPayments";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { putRecurringPayment } from "@/lib/RecurringCRUDfunctions";
import {
  addDays,
  addWeeks,
  addMonths,
  addYears,
  isWithinInterval,
} from "date-fns";

interface RecurringPaymentsContextType {
  recurringPayments: RecurringPaymentType[];
  setRecurringPayments: React.Dispatch<
    React.SetStateAction<RecurringPaymentType[]>
  >;
  isRecurringPaymentsUpdated: boolean;
  setIsRecurringPaymentsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

const RecurringPaymentsContext = createContext<
  RecurringPaymentsContextType | undefined
>(undefined);

export const useRecurringPayments = () => {
  const context = useContext(RecurringPaymentsContext);
  if (!context) {
    throw new Error(
      "useRecurringPayments must be used within a RecurringPaymentsProvider"
    );
  }
  return context;
};

interface RecurringPaymentsProviderProps {
  children: ReactNode;
}

export const RecurringPaymentsProvider = ({
  children,
}: RecurringPaymentsProviderProps) => {
  const [recurringPayments, setRecurringPayments] = useState<
    RecurringPaymentType[]
  >([]);
  const [isRecurringPaymentsUpdated, setIsRecurringPaymentsUpdated] =
    useState(false);
  const [paymentsChecked, setPaymentsChecked] = useState(false);
  const { data: _, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    async function fetchRecurringPayments() {
      try {
        const response = await fetch("/api/recurringPayments", {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        });
        const data = await response.json();

        setRecurringPayments(data.recurringPayments);
      } catch (error) {
        console.log(error);
      }
    }
    if (status !== "authenticated" && status !== "loading") {
      router.push("/session");
    } else {
      fetchRecurringPayments();
    }
  }, [isRecurringPaymentsUpdated, router, status]);

  // useEffect(() => {
  //   async function updatePaymentsIfPaid() {
  //     console.log("RAN");
  //     const payments = recurringPayments.filter((payment) => {
  //       console.log(payment, "PAYMENT");
  //       return payment.transactions?.some((transaction) => transaction.isPaid);
  //     });

  //     console.log("FILTERED");

  //     console.log(payments, "UPDATED RECURRING PAYMENTS");

  //     for (const payment of payments) {
  //       console.log("LOOP RAN");
  //       if (payment.dueDate) {
  //         const dueDate = new Date(payment.dueDate);
  //         const today = new Date();
  //         let nextDueDate;

  //         switch (payment.frequency.toUpperCase()) {
  //           case "DAILY":
  //             nextDueDate = addDays(dueDate, 1);
  //             break;
  //           case "WEEKLY":
  //             nextDueDate = addWeeks(dueDate, 1);
  //             break;
  //           case "BIWEEKLY":
  //             nextDueDate = addWeeks(dueDate, 2);
  //             break;
  //           case "MONTHLY":
  //             nextDueDate = addMonths(dueDate, 1);
  //             break;
  //           case "YEARLY":
  //             nextDueDate = addYears(dueDate, 1);
  //             break;
  //           default:
  //             throw new Error("Invalid frequency");
  //         }

  //         const isDueSoon = isWithinInterval(today, {
  //           start: dueDate,
  //           end: nextDueDate,
  //         });

  //         console.log(isDueSoon, "CONSOLE.LOG");
  //         if (!isDueSoon) continue;
  //         await putRecurringPayment({
  //           ...payment,
  //           paid: false,
  //         });
  //       }
  //     }
  //   }

  //   if (!paymentsChecked && recurringPayments.length > 0) {
  //     updatePaymentsIfPaid().then(() => {
  //       setPaymentsChecked(true); // Mark payments as checked to prevent re-running
  //     });
  //   }
  // }, [recurringPayments, paymentsChecked]);
  const contextValue = {
    recurringPayments,
    setRecurringPayments,
    isRecurringPaymentsUpdated,
    setIsRecurringPaymentsUpdated,
  };
  return (
    <RecurringPaymentsContext.Provider value={contextValue}>
      {children}
    </RecurringPaymentsContext.Provider>
  );
};
