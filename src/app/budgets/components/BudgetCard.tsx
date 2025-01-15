import React from "react";
import { BudgetType } from "@/types/BudgetTypes";
import BudgetHeader from "./budgetCardComps/BudgetHeader";
import BudgetCurrentData from "./budgetCardComps/BudgetCurrentData";
import ProgressBar from "./budgetCardComps/ProgressBar";
import BudgetSpendHistory from "./budgetCardComps/BudgetSpendHistory";

type Props = {
  budget: BudgetType;
};

const BudgetCard = (props: Props) => {
  const { budget } = props;
  return (
    <div className="flex flex-col gap-3 p-4 bg-white rounded-lg shadow-md">
      <BudgetHeader budget={budget} />
      <ProgressBar budget={budget} />
      <div className="flex gap-4">
        <BudgetCurrentData budget={budget} type="SPENT" />
        <BudgetCurrentData budget={budget} type="SAVED" />
      </div>
      <div className="bg-beigeLight p-4 rounded-lg">
        <BudgetSpendHistory budget={budget} />
      </div>
    </div>
  );
};

export default BudgetCard;
