"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { Button } from "@/components/ui/button";
import { postPot } from "@/lib/PotsCRUDfunctions";
import { $Enums } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  type: "POT" | "BUDGET";
};

interface Input {
  label: string;
  type: string;
  value: string | number;
  setValue: React.Dispatch<React.SetStateAction<string | number>>;
}

const DialogPOST = ({ type }: Props) => {
  const [label, setLabel] = useState("");
  const [value, setValue] = useState(0);
  const [color, setColor] = useState<$Enums.ColorTag | undefined>();

  const pageData = {
    POT: ["Add New Pot", "Create a new Pot (Savings, Emergency, etc.)"],
    BUDGET: ["Add New Budget", "Create a new Budget (Groceries, Rent, etc.)"],
  };

  const colorOptions = [
    "GREEN",
    "YELLOW",
    "CYAN",
    "NAVY",
    "RED",
    "PURPLE",
    "TURQUOISE",
    "BROWN",
    "MAGENTA",
    "BLUE",
    "GREY",
    "ARMY",
    "ORANGE",
  ];

  const inputs: { [key: string]: Input[] } = {
    POT: [
      {
        label: "Pot Name",
        type: "text",
        value: label,
        setValue: setLabel as React.Dispatch<
          React.SetStateAction<string | number>
        >,
      },
      {
        label: "Target",
        type: "number",
        value: value,
        setValue: setValue as React.Dispatch<
          React.SetStateAction<string | number>
        >,
      },
      {
        label: "Color Tag",
        type: "text",
        value: color || "",
        setValue: setColor as React.Dispatch<
          React.SetStateAction<string | number>
        >,
      },
    ],
    BUDGET: [
      {
        label: "Budget Category",
        type: "text",
        value: label,
        setValue: setLabel as React.Dispatch<
          React.SetStateAction<string | number>
        >,
      },
      {
        label: "Maximum Spending",
        type: "number",
        value: value,
        setValue: setValue as React.Dispatch<
          React.SetStateAction<string | number>
        >,
      },
      {
        label: "Color Tag",
        type: "text",
        value: color || "",
        setValue: setColor as React.Dispatch<
          React.SetStateAction<string | number>
        >,
      },
    ],
  };

  const crudFunction = {
    POT: {
      post: postPot,
    },
    BUDGET: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      post: function (budget: any) {
        console.log(budget);
      },
    },
  };

  function onSubmitHandler(e: React.FormEvent) {
    e.preventDefault();
    console.log("submitting");
    if (!color) return alert("Please enter a color tag");
    crudFunction[type].post({
      title: label,
      targetAmount: value as number,
      colorTag: color,
    });
  }

  return (
    <Dialog>
      <DialogTrigger className="bg-greyDark text-white p-3 text-[.8rem] rounded-md">
        + Add New {type[0].toUpperCase() + type.toLowerCase().slice(1)}
      </DialogTrigger>
      <DialogContent className="bg-white p-4 rounded-md max-w-[335px]">
        <DialogHeader>
          <DialogTitle>{pageData[type][0]}</DialogTitle>
          <DialogDescription className="mt-[2rem]">
            {pageData[type][1]}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
          {inputs[type].map((input) => (
            <label key={input.label} className="flex flex-col gap-1">
              <p className="text-[.7rem] font-semibold text-greyDark">
                {input.label}
              </p>
              {input.label === "Color Tag" ? (
                <Select
                  value={input.value as string}
                  onValueChange={(value) => input.setValue(value)}
                >
                  <SelectTrigger>
                    <SelectValue>{input.value}</SelectValue>
                  </SelectTrigger>
                  <SelectContent className="max-h-[20rem] overflow-y-auto">
                    {colorOptions.map((color) => (
                      <SelectItem
                        key={color}
                        value={color}
                        className="cursor-pointer"
                      >
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <input
                  type={input.type}
                  className="border border-greyLight rounded-md p-2 ml-1"
                  value={input.value}
                  onChange={(e) => input.setValue(e.target.value)}
                />
              )}
            </label>
          ))}
          <Button className="p-2 rounded-md">
            Create {type[0].toUpperCase() + type.toLowerCase().slice(1)}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogPOST;
