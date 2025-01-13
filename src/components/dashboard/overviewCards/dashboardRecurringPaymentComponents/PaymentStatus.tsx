import { formatCurrency } from "@/utils/formatCurrency";
import React from "react";

type Props = {
  title: string;
  amount: number | undefined;
  color: string;
};

const PaymentStatus = ({ title, amount, color }: Props) => {
  return (
    <div
      className={`flex justify-between items-center  border-l-4 p-4 rounded-md bg-beigeLight`}
      style={{ borderColor: color }}
    >
      <p>{title}</p>
      <p>{formatCurrency(amount)}</p>
    </div>
  );
};

export default PaymentStatus;
