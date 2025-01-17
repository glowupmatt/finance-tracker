"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { usePots } from "@/context/PotsContext";
import { deletePot } from "@/lib/PotsCRUDfunctions";
import { DialogClose } from "@/components/ui/dialog";
import { deleteBudget } from "@/lib/BudgetsCRUDfunctions";
import { useBudgets } from "@/context/BudgetContext";

type Props = {
  dataId: string | undefined;
  type: "POT" | "BUDGET";
};

const DeleteForm = (props: Props) => {
  const { dataId, type } = props;
  const { setIsPotsUpdated } = usePots();
  const { setIsBudgetsUpdated } = useBudgets();

  const handleDelete = async () => {
    if (!dataId) return;

    try {
      if (!type) console.error("No type provided for deletion");
      if (type === "POT") await deletePot(dataId);
      if (type === "BUDGET") await deleteBudget(dataId);
    } catch (error) {
      console.log(error);
    } finally {
      if (type === "POT") setIsPotsUpdated((prev) => !prev);
      if (type === "BUDGET") setIsBudgetsUpdated((prev) => !prev);
    }
  };

  return (
    <div className="flex flex-col justify-between gap-4">
      <DialogClose asChild onClick={handleDelete}>
        <Button variant={"destroy"}>Yes, Confirm Deletion</Button>
      </DialogClose>
      <DialogClose>
        <div className="bg-none text-beigeDark p-3">No, Go Back</div>
      </DialogClose>
    </div>
  );
};

export default DeleteForm;
