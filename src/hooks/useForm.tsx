"use client";
import { useEffect, useState } from "react";
import { postPot, putPot } from "@/lib/PotsCRUDfunctions";
import { ColorTag, Transaction, TransactionType } from "@prisma/client";
import { usePots } from "@/context/PotsContext";
import { TransactionForm } from "@/types/TransactionTypes";
import { PotType } from "@/types/PotTypes";
import { Budget } from "@/types/BudgetTypes";
import { postBudget, putBudget } from "@/lib/BudgetsCRUDfunctions";
import { useBudgets } from "@/context/BudgetContext";
import { RecurringPaymentType } from "@/types/RecurringPayments";
import {
  postTransaction,
  putTransaction,
} from "@/lib/TransactionCRUDfunctions";
import { useTransactions } from "@/context/TransactionsContext";
import { postRecurringPayment } from "@/lib/RecurringCRUDfunctions";

export const useForm = (
  type?: "POT" | "BUDGET" | "TRANSACTION" | "RECURRING",
  CRUD?: "POST" | "PUT",
  data?: PotType | Budget | TransactionForm | RecurringPaymentType | undefined
) => {
  const [label, setLabel] = useState<string>("");
  const [value, setValue] = useState<number | string>("");
  const [color, setColor] = useState<string | undefined>(undefined);
  const [postBody, setPostBody] = useState<
    PotType | Budget | TransactionForm | RecurringPaymentType
  >();
  const [transactionType, setTransactionType] = useState<string>("");
  const [paid, setPaid] = useState<boolean | null>(false);
  const [category, setCategory] = useState<string>("");
  const [senderOrRecipient, setSenderOrRecipient] = useState<string>("");
  const [transactionId, setTransactionId] = useState<string>("");
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [frequency, setFrequency] = useState<
    "MONTHLY" | "DAILY" | "WEEKLY" | "YEARLY" | "BIWEEKLY"
  >("MONTHLY");
  const [cancelled, setCancelled] = useState<boolean>(false);

  const { setIsPotsUpdated } = usePots();
  const { setIsBudgetsUpdated } = useBudgets();
  const { setIsTransactionsUpdated } = useTransactions();

  useEffect(() => {
    if (data) {
      switch (type) {
        case "POT":
          if ("title" in data && "targetAmount" in data) {
            const potData = data as PotType;
            setLabel(potData.title);
            setValue(potData.targetAmount);
            setColor(potData.colorTag);
          }
          break;
        case "BUDGET":
          if ("name" in data && "maxSpend" in data) {
            const budgetData = data as Budget;
            setLabel(budgetData.name);
            setValue(budgetData.maxSpend);
            setColor(budgetData.colorTag);
          }
          break;
        case "TRANSACTION":
          if ("title" in data && "amount" in data) {
            const transactionData = data as TransactionForm;
            setLabel(transactionData.title);
            setValue(transactionData.amount);
            setTransactionType(transactionData.type);
            setPaid(transactionData.isPaid);
            setCategory(transactionData.category);
            setSenderOrRecipient(transactionData.senderOrRecipient || "");
            setTransactionId(transactionData.id || "");
          }
          break;
        case "RECURRING":
          if ("title" in data && "amount" in data) {
            const recurringPayment = data as RecurringPaymentType;
            setLabel(recurringPayment.title);
            setValue(recurringPayment.amount);
            setDueDate(new Date(recurringPayment.dueDate));
            setFrequency(recurringPayment.frequency);
            setCancelled(recurringPayment.cancelled ?? false);
          }
          break;
        default:
          break;
      }
    }
  }, [setLabel, setValue, data, type]);

  function getInputs() {
    return {
      POT: [
        {
          label: "Pot Name",
          type: "text",
          value: label,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            setLabel(e.target.value),
        },
        {
          label: "Target Amount",
          type: "number",
          value: value,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(Number(e.target.value)),
        },
        {
          label: "Color Tag",
          type: "color",
          value: color,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            setColor(e.target.value),
        },
      ],
      BUDGET: [
        {
          label: "Budget Name",
          type: "text",
          value: label,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            setLabel(e.target.value),
        },
        {
          label: "Max Spend",
          type: "number",
          value: value,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(Number(e.target.value)),
        },
        {
          label: "Color Tag",
          type: "color",
          value: color,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            setColor(e.target.value),
        },
      ],
      TRANSACTION: [
        {
          label: "Transaction Title",
          type: "text",
          value: label,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            setLabel(e.target.value),
        },
        {
          label: "Amount",
          type: "number",
          value: value,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(Number(e.target.value)),
        },
        {
          label: "Category",
          type: "text",
          value: category,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            setCategory(e.target.value),
        },
        {
          label: "Transaction Type",
          type: "text",
          value: transactionType,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            setTransactionType(e.target.value),
        },
        {
          label: "Paid",
          type: "checkbox",
          value: paid,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            setPaid(e.target.checked),
        },
        {
          label: "Sender or Recipient",
          type: "text",
          value: senderOrRecipient,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            setSenderOrRecipient(e.target.value),
        },
      ],
      RECURRING: [
        {
          label: "Recurring Payment Name",
          type: "text",
          value: label,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            setLabel(e.target.value),
        },
        {
          label: "Amount",
          type: "number",
          value: value,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(Number(e.target.value)),
        },
        {
          label: "Due Date",
          type: "date",
          value: dueDate.toISOString().split("T")[0],
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            setDueDate(new Date(e.target.value)),
        },
        {
          label: "Frequency",
          type: "text",
          value: frequency,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            setFrequency(
              e.target.value as
                | "MONTHLY"
                | "DAILY"
                | "WEEKLY"
                | "YEARLY"
                | "BIWEEKLY"
            ),
        },
        {
          label: "Canceled",
          type: "checkbox",
          value: cancelled,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            setCancelled(e.target.checked),
        },
      ],
    };
  }

  const crudFunction = {
    POT: {
      post: postPot,
      put: putPot,
    },
    BUDGET: {
      post: postBudget,
      put: putBudget,
    },
    TRANSACTION: {
      post: postTransaction,
      put: putTransaction,
    },
    RECURRING: {
      post: postRecurringPayment,
      put: () => {},
    },
  };

  useEffect(() => {
    if (CRUD === "PUT" && type === "POT") {
      setPostBody({
        title: label,
        targetAmount: value as number,
        colorTag: color as ColorTag,
        id: (data as PotType)?.id as string,
        userId: (data as PotType)?.userId as string,
        transactions: (data as PotType)?.transactions as Transaction[],
      });
    }

    if (CRUD === "POST" && type === "POT") {
      setPostBody({
        title: label,
        targetAmount: value as number,
        colorTag: color as ColorTag,
        id: (data as PotType)?.id as string,
        userId: (data as PotType)?.userId as string,
        transactions: (data as PotType)?.transactions as Transaction[],
      });
    }

    if (CRUD === "PUT" && type === "BUDGET") {
      setPostBody({
        name: label,
        maxSpend: value as number,
        colorTag: color as ColorTag,
        id: (data as Budget)?.id as string,
        userId: (data as Budget)?.userId as string,
      });
    }

    if (CRUD === "POST" && type === "TRANSACTION") {
      setPostBody({
        title: label,
        amount: value as number,
        type: transactionType as TransactionType,
        isPaid: paid ?? false,
        category,
        senderOrRecipient,
      });
    }
    if (CRUD === "PUT" && type === "TRANSACTION") {
      setPostBody({
        id: transactionId,
        title: label,
        amount: value as number,
        type: transactionType as TransactionType,
        isPaid: paid ?? false,
        category,
        senderOrRecipient,
      });
    }

    if (CRUD === "POST" && type === "RECURRING") {
      setPostBody({
        title: label,
        amount: value as number,
        dueDate: dueDate,
        paid: paid ?? false,
        frequency,
      });
    }

    console.log("data", paid);
  }, [
    CRUD,
    type,
    label,
    value,
    color,
    data,
    paid,
    category,
    senderOrRecipient,
    transactionType,
    transactionId,
    dueDate,
    frequency,
    cancelled,
  ]);

  async function onSubmitHandler(e: React.FormEvent) {
    e.preventDefault();
    if (!color && type !== "TRANSACTION" && type !== "RECURRING")
      return alert("Please enter a color tag");

    try {
      if (!type) {
        console.error("Type is undefined");
        return;
      }

      switch (CRUD) {
        case "POST":
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await crudFunction[type].post(postBody as any);
          break;
        case "PUT":
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await crudFunction[type].put(postBody as any);
          break;
        default:
          console.error("Invalid CRUD operation");
      }
      if (type === "POT") {
        setIsPotsUpdated((prev) => !prev);
      }
      if (type === "BUDGET") {
        setIsBudgetsUpdated((prev) => !prev);
      }
      if (type === "TRANSACTION") {
        setIsTransactionsUpdated((prev) => !prev);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLabel("");
      setValue(0);
      setColor(undefined);
      setTransactionType("");
      setPaid(false);
      setCategory("");
      setSenderOrRecipient("");
      setTransactionId("");
      setDueDate(new Date());
      setFrequency("MONTHLY");
      setCancelled(false);
    }
  }

  return {
    getInputs,
    onSubmitHandler,
  };
};
