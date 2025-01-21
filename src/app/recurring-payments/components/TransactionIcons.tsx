import React from "react";
import { FaMinus, FaMoneyCheckAlt } from "react-icons/fa";

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

const TransactionIcons = (props: Props) => {
  const { transaction } = props;
  return (
    <div className="flex items-center gap-2">
      {transaction.title !== "Salary" ? (
        <div className="flex gap-[1px] text-[.7rem] items-center bg-secondaryRed p-2 rounded-full ">
          <FaMinus className="text-black" />
        </div>
      ) : (
        <div className="flex gap-[1px] text-[.7rem] items-center bg-secondaryGreen p-2 rounded-full ">
          <FaMoneyCheckAlt className="text-black" />
        </div>
      )}
      <h3 className="font-semibold">{transaction.title}</h3>
    </div>
  );
};

export default TransactionIcons;
