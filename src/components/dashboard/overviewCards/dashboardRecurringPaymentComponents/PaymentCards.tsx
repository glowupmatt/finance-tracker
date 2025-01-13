import { useUser } from "@/context/UserContext";
import React from "react";
import PaymentStatus from "./PaymentStatus";
import { recurringPaymentsFilters } from "@/utils/dateFunctions";

const PaymentCards = () => {
  const { recurringPayments } = useUser();
  const paidBills = recurringPaymentsFilters(recurringPayments, "paidBills");
  const totalUpcomingPayments = recurringPaymentsFilters(
    recurringPayments,
    "totalUpcomingPayments"
  );
  const dueSoon = recurringPaymentsFilters(recurringPayments, "dueSoon");
  const dueTodayOrOverdue = recurringPaymentsFilters(
    recurringPayments,
    "dueTodayOrOverdue"
  );

  return (
    <div className="grid grid-cols-1 gap-4 mt-3">
      <PaymentStatus title="Paid Bills" amount={paidBills} color="#277C78" />
      <PaymentStatus
        title="Total Upcoming"
        amount={totalUpcomingPayments}
        color="#F2CDAC"
      />
      <PaymentStatus
        title="Due Today Or OverDue"
        amount={dueTodayOrOverdue}
        color="red"
      />
      <PaymentStatus title="Due Soon" amount={dueSoon} color="#C94736" />
    </div>
  );
};

export default PaymentCards;
