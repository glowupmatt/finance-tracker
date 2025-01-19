import { RecurringPaymentType } from "@/types/RecurringPayments";
// import { TransactionType } from "@/types/TransactionTypes";
// import { $Enums } from "@prisma/client";

export async function postRecurringPayment(
  recurringPayment: RecurringPaymentType | undefined
) {
  if (!recurringPayment) return;
  const frequency = recurringPayment.frequency
    .split("-")
    .join("")
    .toUpperCase();

  return await fetch("/api/recurringPayments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: recurringPayment.title,
      amount: recurringPayment.amount,
      dueDate: recurringPayment.dueDate,
      paid: recurringPayment.paid,
      frequency: frequency,
    }),
  });
}
