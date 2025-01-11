import { Transaction } from "@prisma/client";

export function calculateTotal(
  transactions: Transaction[],
  type: string
): number | undefined {
  return transactions?.reduce((acc, transaction) => {
    if (transaction.type === type) {
      return acc + transaction.amount;
    } else {
      return acc;
    }
  }, 0);
}
