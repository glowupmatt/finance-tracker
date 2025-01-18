import React from "react";
import EditModal from "@/components/CRUDmodals/EditModal";
import { BudgetType } from "@/types/BudgetTypes";
import { translateColorToHex } from "@/utils/translateColorToHex";

type Props = {
  budget: BudgetType;
};

const BudgetHeader = (props: Props) => {
  const { budget } = props;
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className="rounded-full w-[1rem] h-[1rem]"
          style={{ backgroundColor: translateColorToHex(budget.colorTag) }}
        />
        <h2 className="font-semibold text-[1rem]">{budget.name}</h2>
      </div>
      <EditModal type="BUDGET" budget={budget} />
    </div>
  );
};

export default BudgetHeader;
