"use client";
import { useUser } from "@/context/UserContext";
import { recurringPaymentsFilters } from "@/utils/dateFunctions";
import { formatCurrency } from "@/utils/formatCurrency";
import React from "react";

function SummaryCard() {
  const { recurringPayments } = useUser();
  const totalPaidBills = recurringPayments?.filter(
    (payment) => payment.paid === true
  );
  const totalUpcomingPayments = recurringPayments?.filter((payment) => {
    return payment.paid === false && new Date(payment.dueDate) >= new Date();
  });
  const dueSoon = recurringPayments?.filter((payment) => {
    const today = new Date();
    const next7Days = new Date(today);
    next7Days.setDate(today.getDate() + 7);
    const dueDate = new Date(payment.dueDate);
    return dueDate >= today && dueDate <= next7Days;
  });

  const overdue = recurringPayments?.filter((payment) => {
    const today = new Date();
    const dueDate = new Date(payment.dueDate);
    return dueDate <= today && payment.paid === false;
  });

  const data = [
    {
      title: "Paid Bills",
      count: totalPaidBills?.length,
      amount: formatCurrency(
        recurringPaymentsFilters(recurringPayments, "paidBills")
      ),
      color: "#201F24",
    },
    {
      title: "Total Upcoming",
      count: totalUpcomingPayments?.length,
      amount: formatCurrency(
        recurringPaymentsFilters(recurringPayments, "totalUpcomingPayments")
      ),
      color: "#201F24",
    },
    {
      title: "Due Soon",
      count: dueSoon?.length,
      amount: formatCurrency(
        recurringPaymentsFilters(recurringPayments, "dueSoon")
      ),
      color: "#201F24",
    },
    {
      title: "Overdue",
      count: overdue?.length,
      amount: formatCurrency(
        recurringPaymentsFilters(overdue, "dueTodayOrOverdue")
      ),
      color: "#C94736",
    },
  ];

  return (
    <div className="bg-white p-5 rounded-md">
      <p>Summary</p>
      {data.map((item, index) => (
        <div
          key={index}
          className="text-greyLight flex items-center justify-start border-b border-greyLight py-2 px-4 gap-2"
        >
          <div
            className="flex justify-between w-full items-center"
            style={{ color: item.color }}
          >
            <p className="text-[.8rem]">{item.title}</p>
            <div className="flex items-center gap-1">
              <p className="text-[.9rem] font-bold">{item.count}</p>
              <p>({item.amount})</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SummaryCard;
