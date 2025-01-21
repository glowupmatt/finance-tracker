import { RecurringPaymentType } from "@/types/RecurringPayments";

const today = new Date();
const next7Days = new Date(today);
next7Days.setDate(today.getDate() + 7);

export const recurringPaymentsFilters = (
  recurringPayments: RecurringPaymentType[] | undefined,
  type: string
) => {
  if (!recurringPayments) return 0;

  if (type === "totalBills") {
    return recurringPayments
      ?.filter((payment) => payment.title !== "Salary")
      .reduce((acc, curr) => acc + curr.amount, 0);
  }

  if (type === "paidBills") {
    return recurringPayments
      ?.filter((payment) => payment.paid === true && payment.title !== "Salary")
      .reduce((acc, curr) => acc + curr.amount, 0);
  }

  if (type === "totalUpcomingPayments") {
    return recurringPayments
      ?.filter(
        (payment) =>
          payment.paid === false &&
          payment.title !== "Salary" &&
          new Date(payment.dueDate) >= today
      )
      .reduce((acc, curr) => acc + curr.amount, 0);
  }

  if (type === "dueSoon") {
    return recurringPayments
      ?.filter((payment) => {
        const dueDate = new Date(payment.dueDate);
        return dueDate >= today && dueDate <= next7Days;
      })
      .filter((payment) => payment.paid === false)
      .reduce((acc, curr) => acc + curr.amount, 0);
  }

  if (type === "dueTodayOrOverdue") {
    return recurringPayments
      ?.filter((payment) => {
        const dueDate = new Date(payment.dueDate);
        return (
          dueDate < today &&
          payment.paid === false &&
          payment.title !== "Salary"
        );
      })
      .reduce((acc, curr) => acc + curr.amount, 0);
  }
};
