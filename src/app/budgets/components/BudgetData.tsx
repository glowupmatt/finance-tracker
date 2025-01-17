import React from "react";
import BudgetCard from "./BudgetCard";
import { BudgetType } from "@/types/BudgetTypes";

type Props = {
  budgets: BudgetType[] | undefined;
};

const BudgetData = (props: Props) => {
  const { budgets } = props;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1  pb-[2rem]">
      {budgets?.map((budget) => (
        <BudgetCard key={budget.id} budget={budget} />
      ))}
    </div>
  );
};

export default BudgetData;
