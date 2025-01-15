import React from "react";

type Props = {
  budget: {
    id: string;
    name: string;
    colorTag: string;
  };
};

const BudgetHeader = (props: Props) => {
  const { budget } = props;
  return (
    <div className="flex items-center gap-3">
      <div
        className="rounded-full w-[1rem] h-[1rem]"
        style={{ backgroundColor: budget.colorTag }}
      />
      <h2 className="font-semibold text-[1rem]">{budget.name}</h2>
    </div>
  );
};

export default BudgetHeader;
