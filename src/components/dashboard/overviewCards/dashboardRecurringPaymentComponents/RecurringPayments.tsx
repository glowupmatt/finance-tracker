import React from "react";
import DashboardCardHeader from "../DashboardCardHeader";
import PaymentCards from "./PaymentCards";

const RecurringPayments = () => {
  return (
    <div className="bg-white shadow-lg rounded-md p-4 w-full">
      <DashboardCardHeader
        title="Recurring Transactions"
        buttonText="See Details"
        link="recurring-payments"
      />
      <PaymentCards />
    </div>
  );
};

export default RecurringPayments;
