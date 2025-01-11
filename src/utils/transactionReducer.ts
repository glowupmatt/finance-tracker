import { Transaction } from "@prisma/client";

export function transactionReducer(transactions: Transaction[], type?: string) {
  if (!type) {
    return transactions.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);
  }

  return transactions.reduce((acc, transaction) => {
    if (transaction.type === type) {
      return acc + transaction.amount;
    } else {
      return acc;
    }
  }, 0);
}
