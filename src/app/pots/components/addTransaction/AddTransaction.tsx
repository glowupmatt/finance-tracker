"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@radix-ui/react-dialog";
import ProgressBar from "../ProgressBar";
import { PotType } from "@/types/PotTypes";
import { postTransaction } from "@/lib/PotsCRUDfunctions";
import { usePots } from "@/context/PotsContext";
import AddTransactionForm from "@/components/CRUDmodals/addTansactionForm/AddTransactionForm";

type Props = {
  isDeposit: boolean;
  pot: PotType;
};

const AddTransaction = ({ isDeposit, pot }: Props) => {
  const [amount, setAmount] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { setIsPotsUpdated } = usePots();
  const buttonTitle = isDeposit ? "+ Add Money" : "Withdraw";
  const title = isDeposit ? "Add Money" : "Withdraw";
  const description = isDeposit
    ? "Add money to your pot"
    : "Withdraw money from your pot";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await postTransaction(pot.id, amount, isDeposit);
      setIsPotsUpdated((prev) => !prev);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDialogOpen((prev) => !prev);
    }
  }

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={() => setIsDialogOpen((prev) => !prev)}
    >
      <DialogTrigger asChild>
        <Button variant={"secondary"} className="w-full">
          <p className="font-semibold text-[.7rem]">{buttonTitle}</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white p-4 rounded-md max-w-[335px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="mt-[2rem]">
            {description}
          </DialogDescription>
        </DialogHeader>
        <ProgressBar
          pot={pot}
          type="ADD-TRANSACTION"
          amountToAdd={amount}
          isDeposit={isDeposit}
        />
        <AddTransactionForm
          handleSubmit={handleSubmit}
          setAmount={setAmount}
          buttonTitle={buttonTitle}
          type="POT"
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddTransaction;
