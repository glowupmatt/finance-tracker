import React from "react";
import { Transaction } from "@prisma/client";
import Transactions from "@/components/dashboard/overviewCards/dashboardTransactionComponents/Transactions";
type Props = {
  transactions: Transaction[];
};

const MobileDataDisplay = ({ transactions }: Props) => {
  if (transactions.length === 0) return <div>No transactions</div>;

  return <Transactions type="MainPage" />;
};

export default MobileDataDisplay;
