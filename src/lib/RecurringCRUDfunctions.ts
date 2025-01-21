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

  if (recurringPayment.paid === true) {
    return await fetch(`/api/recurringPayments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: recurringPayment.id,
        title: recurringPayment.title,
        amount: +recurringPayment.amount,
        dueDate: recurringPayment.dueDate,
        paid: recurringPayment.paid,
        cancelled: recurringPayment.cancelled,
        frequency: frequency,
        transactions: [
          {
            title: recurringPayment.title,
            amount: +recurringPayment.amount,
            type: "EXPENSE",
            date: new Date(),
            isPaid: true,
            category: "RECURRING",
            senderOrRecipient: recurringPayment.title,
          },
        ],
      }),
    });
  }

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

export async function putRecurringPayment(
  recurringPayment: RecurringPaymentType | undefined
) {
  if (!recurringPayment) return;

  const frequency = recurringPayment.frequency
    .split("-")
    .join("")
    .toUpperCase();

  console.log(recurringPayment, "RECURRING PAYMENT");

  if (recurringPayment.paid === true) {
    return await fetch(`/api/recurringPayments/${recurringPayment.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: recurringPayment.id,
        title: recurringPayment.title,
        amount: +recurringPayment.amount,
        dueDate: recurringPayment.dueDate,
        paid: recurringPayment.paid,
        cancelled: recurringPayment.cancelled,
        frequency: frequency,
        transactions: [
          {
            title: recurringPayment.title,
            amount: +recurringPayment.amount,
            type: "EXPENSE",
            date: new Date(),
            isPaid: true,
            category: "RECURRING",
            senderOrRecipient: recurringPayment.title,
          },
        ],
      }),
    });
  }

  return await fetch(`/api/recurringPayments/${recurringPayment.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: recurringPayment.id,
      title: recurringPayment.title,
      amount: +recurringPayment.amount,
      dueDate: recurringPayment.dueDate,
      paid: recurringPayment.paid,
      cancelled: recurringPayment.cancelled,
      frequency: frequency,
    }),
  });
}

export async function deleteRecurringPayment(id: string) {
  return await fetch(`/api/recurringPayments/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
  });
}
