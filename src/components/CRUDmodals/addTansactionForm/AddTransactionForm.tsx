import { Button } from "@/components/ui/button";
import React from "react";

type Props = {
  handleSubmit(e: React.FormEvent): Promise<void>;
  isDeposit?: boolean;
  setAmount(amount: number): void;
  buttonTitle: string;
  type: "POT" | "BUDGET";
  setTitle?: React.Dispatch<React.SetStateAction<string>>;
};

const AddTransactionForm = (props: Props) => {
  const { handleSubmit, isDeposit, setAmount, buttonTitle, type, setTitle } =
    props;

  const displayDeposit =
    type === "POT" ? (
      <label htmlFor="amount" className="text-greyDark text-[.7rem]">
        Amount to {isDeposit ? "Add" : "Withdraw"}
      </label>
    ) : (
      <label htmlFor="amount" className="text-greyDark text-[.7rem]">
        Transaction Amount
      </label>
    );

  const displayTitleInput = type === "BUDGET" && setTitle && (
    <label htmlFor="title" className="text-greyDark text-[.7rem] flex flex-col">
      Transaction Title
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-200 p-2 rounded-md mb-2"
      />
    </label>
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1">
        {displayTitleInput}
        {displayDeposit}
        <input
          type="number"
          onChange={(e) => setAmount(parseInt(e.target.value))}
          className="border border-gray-200 p-2 rounded-md mb-2"
        />
        <Button variant="primary" className="w-full">
          {buttonTitle}
        </Button>
      </div>
    </form>
  );
};

export default AddTransactionForm;
