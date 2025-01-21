import { formatCurrency } from "@/utils/formatCurrency";
import React from "react";

type Props = {
  transaction: {
    id?: string;
    title: string;
    amount: string;
    dueDate: Date;
    paid: boolean;
    frequency: string;
  };
};

const TransactionMainInfo = (props: Props) => {
  const { transaction } = props;

  const getDateSuffix = (day: number) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const day = transaction.dueDate.getDate();
  const formattedDate = `${day}${getDateSuffix(day)}`;
  return (
    <div className="flex gap-[2px] justify-between w-full">
      <div className="flex gap-[1px] text-[.7rem] text-secondaryGreen items-center justify-center">
        <div>
          <p className="tracking-wider">
            {transaction.frequency.toUpperCase()[0] +
              transaction.frequency.toLocaleLowerCase().slice(1)}
            -
            {isNaN(transaction.dueDate.getTime())
              ? "Invalid Date"
              : formattedDate}
          </p>
        </div>
        {transaction.paid === true ? (
          <img
            src="/images/icon-bill-paid.svg"
            alt="paid"
            className="w-4 h-4 ml-2"
          />
        ) : (
          <img
            src="/images/icon-bill-due.svg"
            alt="paid"
            className="w-4 h-4 ml-2"
          />
        )}
      </div>
      <div>
        <p className="text-[14px] font-bold lg:hidden">
          {formatCurrency(transaction.amount)}
        </p>
      </div>
    </div>
  );
};

export default TransactionMainInfo;
