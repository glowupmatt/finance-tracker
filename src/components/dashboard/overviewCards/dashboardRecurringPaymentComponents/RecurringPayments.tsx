import React from "react";
import DashboardCardHeader from "../DashboardCardHeader";
import PaymentCards from "./PaymentCards";

const RecurringPayments = () => {
  return (
    <div className="bg-white shadow-sm rounded-md p-4 w-full">
      <DashboardCardHeader
        title="Recurring Transactions"
        buttonText="See Details"
        link="recurring-transactions"
      />
      <PaymentCards />
    </div>
  );
};

export default RecurringPayments;
