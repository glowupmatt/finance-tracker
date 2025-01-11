import React from "react";
import { FaMoneyCheckAlt, FaMinus } from "react-icons/fa";

type Props = {
  transaction: {
    type: string;
    title: string;
  };
};

const TransactionDetails = (props: Props) => {
  const { transaction } = props;
  return (
    <div className="flex gap-2 w-full items-center">
      <div
        className={`${
          transaction.type === "EXPENSE"
            ? "bg-secondaryRed"
            : "bg-secondaryGreen"
        } w-8 h-8 rounded-full flex items-center justify-center`}
      >
        {transaction.type === "EXPENSE" ? (
          <FaMinus className="text-white" />
        ) : (
          <FaMoneyCheckAlt className="text-white" />
        )}
      </div>
      <p className="text-[.9rem] font-bold">{transaction.title}</p>
    </div>
  );
};

export default TransactionDetails;
