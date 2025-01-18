"use client";
import React, { useState } from "react";
import { BudgetType } from "@/types/BudgetTypes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaCaretRight } from "react-icons/fa";
import AddTransactionForm from "@/components/CRUDmodals/addTransactionForm/AddTransactionForm";
import { postBudgetTransaction } from "@/lib/BudgetsCRUDfunctions";
import { useBudgets } from "@/context/BudgetContext";

type Props = {
  budget: BudgetType;
};

const AddTransactionModal = (props: Props) => {
  const { budget } = props;
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { setIsBudgetsUpdated } = useBudgets();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await postBudgetTransaction(budget, amount, title);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDialogOpen((prev) => !prev);
      setIsBudgetsUpdated((prev) => !prev);
    }
  }

  return (
    <div className="mb-4 flex justify-between items-center">
      <h4 className="text-[1.2rem] font-bold">
        {budget.transactions.length === 0
          ? "No Spending History"
          : "Latest Spending"}
      </h4>
      <Dialog
        open={isDialogOpen}
        onOpenChange={() => setIsDialogOpen((prev) => !prev)}
      >
        <DialogTrigger asChild>
          <Button
            variant={"tertiary"}
            className="flex items-center gap-2 hover:text-greyDark"
          >
            <span className="text-[.8rem]">Add Transaction</span>
            <FaCaretRight />
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white p-4 rounded-md max-w-[335px]">
          <DialogHeader>
            <DialogTitle>Add Transaction</DialogTitle>
            <DialogDescription className="mt-[2rem]">
              Add a new transaction to your budget
            </DialogDescription>
            <AddTransactionForm
              handleSubmit={handleSubmit}
              setAmount={setAmount}
              setTitle={setTitle}
              type="BUDGET"
              buttonTitle="Add Transaction"
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddTransactionModal;
