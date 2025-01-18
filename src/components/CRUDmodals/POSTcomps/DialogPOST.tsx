"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import { PotType } from "@/types/PotTypes";
// import { BudgetType } from "@/types/BudgetTypes";
import DialogTriggerCondition from "./DialogTriggerCondition";
import Form from "./Form";
import DeleteForm from "../DELETEcomps/DeleteForm";
import { BudgetType } from "@/types/BudgetTypes";
import { TransactionType } from "@/types/TransactionTypes";

type Props = {
  type: "POT" | "BUDGET" | "TRANSACTION";
  CRUD: "POST" | "PUT" | "DELETE";
  data?: PotType | BudgetType | TransactionType | undefined;
  openModal?: boolean;
  onClose?: () => void;
};

const DialogPOST = ({ type, CRUD, data, openModal, onClose }: Props) => {
  const pageData = {
    POT: {
      POST: ["Add New Pot", "Create a new Pot (Savings, Emergency, etc.)"],
      PUT: ["Edit Pot", "Update your Pot details"],
      DELETE: ["Delete Pot", "Are you sure you want to delete this Pot?"],
    },
    BUDGET: {
      POST: ["Add New Budget", "Create a new Budget (Groceries, Rent, etc.)"],
      PUT: ["Edit Budget", "Update your Budget details"],
      DELETE: ["Delete Budget", "Are you sure you want to delete this Budget?"],
    },
    TRANSACTION: {
      POST: ["Add New Transaction", "Create a new Transaction"],
      PUT: ["Edit Transaction", "Update your Transaction details"],
      DELETE: [
        "Delete Transaction",
        "Are you sure you want to delete this Transaction?",
      ],
    },
  };

  console.log("data", data);

  return (
    <Dialog open={openModal} onOpenChange={onClose}>
      <DialogTriggerCondition type={type} CRUD={CRUD} />
      <DialogContent className="bg-white p-4 rounded-md max-w-[335px]">
        <DialogHeader>
          <DialogTitle>{pageData[type][CRUD][0]}</DialogTitle>
          <DialogDescription className="mt-[2rem]">
            {pageData[type][CRUD][1]}
          </DialogDescription>
        </DialogHeader>
        {CRUD === "DELETE" ? (
          <DeleteForm dataId={data?.id} type={type} />
        ) : (
          <Form type={type} CRUD={CRUD} data={data} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogPOST;
