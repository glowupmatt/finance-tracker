"use client";

import React from "react";
import { useUser } from "@/context/UserContext";
import { recurringPaymentsFilters } from "@/utils/dateFunctions";
import { formatCurrency } from "@/utils/formatCurrency";

const TotalBillsCard = () => {
  const { recurringPayments } = useUser();

  const totalBills = recurringPaymentsFilters(recurringPayments, "totalBills");
  const formattedTotalBills = formatCurrency(totalBills);
  console.log(formattedTotalBills);
  return (
    <div className="bg-greyDark p-4 rounded-lg text-white flex items-center justify-start gap-4">
      <div>
        <img
          className="w-[2rem] h-[2rem]"
          src="/images/icon-nav-recurring-bills.svg"
          alt="total bills"
        />
      </div>
      <div className="text-start">
        <h1 className="mb-3">Total Bills</h1>
        <h3 className="text-[2rem] font-bold">{formattedTotalBills}</h3>
      </div>
    </div>
  );
};

export default TotalBillsCard;
