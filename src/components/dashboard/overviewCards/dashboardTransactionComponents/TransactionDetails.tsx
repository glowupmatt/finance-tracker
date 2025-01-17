import React from "react";
import { FaMoneyCheckAlt, FaMinus } from "react-icons/fa";

type Props = {
  transaction: {
    type: string;
    title: string;
    category: string;
    amount: number;
  };
  type: "MainPage" | "Dashboard";
};

const TransactionDetails = (props: Props) => {
  const { transaction, type } = props;
  const isRed =
    transaction.amount.toString().includes("-") ||
    transaction.type === "EXPENSE";

  const isGreen = transaction.type === "INCOME" || transaction.amount > 0;

  return (
    <div className="flex gap-2 w-full items-center">
      <div
        className={`${
          isRed ? "bg-secondaryRed" : isGreen ? "bg-secondaryGreen" : ""
        } w-8 h-8 rounded-full flex items-center justify-center`}
      >
        {isRed ? (
          <FaMinus className="text-white" />
        ) : isGreen ? (
          <FaMoneyCheckAlt className="text-white" />
        ) : null}
      </div>
      <div>
        <p className="text-[.9rem] font-bold">{transaction.title}</p>
        {type === "MainPage" && (
          <p className="text-[.7rem] font-thin text-greySemiDark">
            {transaction.category}
          </p>
        )}
      </div>
    </div>
  );
};

export default TransactionDetails;
