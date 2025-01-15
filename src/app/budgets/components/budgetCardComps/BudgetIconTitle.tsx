import React from "react";
import { FaMinus, FaMoneyCheckAlt } from "react-icons/fa";
import { Transaction } from "@prisma/client";

type Props = {
  transaction: Transaction;
};

const BudgetIconTitle = (props: Props) => {
  const { transaction } = props;
  return (
    <div className="flex items-center gap-2">
      {transaction.type === "EXPENSE" ? (
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

export default BudgetIconTitle;
