import React from "react";
import { formatCurrency } from "@/utils/formatCurrency";
import { Transaction } from "@prisma/client";

type Props = {
  transaction: Transaction;
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

  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const validDate = new Date(date);
  return (
    <div className="flex gap-[1px] flex-col items-end w-full justify-center max-w-[100px]">
      <p className={`${priceClass} ${getPriceColorClass()}`}>
        {type === "EXPENSE" ? `-${formattedCurrency}` : formattedCurrency}
      </p>
      <p className={dateClass}>{formatter.format(validDate)}</p>
    </div>
  );
};

export default TransactionPriceAndDate;
