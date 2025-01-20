import { TransactionForm, TransactionType } from "@/types/TransactionTypes";

export async function postTransaction(
  transaction: TransactionForm | undefined
) {
  if (!transaction) return;
  return await fetch("/api/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: transaction.title,
      amount: transaction.amount,
      type: transaction.type.toUpperCase(),
      date: new Date(),
      isPaid: transaction.isPaid,
      category: transaction.category,
      senderOrRecipient: transaction.senderOrRecipient,
    }),
  });
}

export async function putTransaction(transaction: TransactionType | undefined) {
  if (!transaction) return;
  const transactionId = transaction.id;
  return await fetch(`/api/transactions/${transactionId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: transaction.title,
      amount: transaction.amount,
      type: transaction.type.toUpperCase(),
      isPaid: transaction.isPaid,
      category: transaction.category,
      senderOrRecipient: transaction.senderOrRecipient,
    }),
  });
}

export async function deleteTransaction(transactionId: string) {
  return await fetch(`/api/transactions/${transactionId}`, {
    method: "DELETE",
  });
}
