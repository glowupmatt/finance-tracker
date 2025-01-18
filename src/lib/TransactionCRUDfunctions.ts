import { TransactionForm } from "@/types/TransactionTypes";

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
