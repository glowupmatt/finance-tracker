import React from "react";
import { formatCurrency } from "@/utils/formatCurrency";

type Props = {
  transaction: {
    type: string;
    amount: number;
    date: string;
  };
};

const TransactionPriceAndDate = (props: Props) => {
  const { transaction } = props;
  const { type, amount, date } = transaction;

  const formattedCurrency = formatCurrency(amount);

  const priceClass = "text-[1rem] font-semibold";
  const dateClass = "text-beigeDark text-[.7rem]";

  const getPriceColorClass = () => {
    if (type === "EXPENSE") return "text-secondaryRed";
    if (type === "INCOME") return "text-secondaryGreen";
    return "";
  };

  return (
    <div className="flex gap-[1px] flex-col items-end w-full justify-center max-w-[100px]">
      <p className={`${priceClass} ${getPriceColorClass()}`}>
        {type === "EXPENSE" ? `-${formattedCurrency}` : formattedCurrency}
      </p>
      <p className={dateClass}>{date}</p>
    </div>
  );
};

export default TransactionPriceAndDate;
