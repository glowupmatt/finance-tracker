import { DialogTrigger } from "@/components/ui/dialog";
import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";

type Props = {
  type: "POT" | "BUDGET";
  CRUD: "POST" | "PUT" | "DELETE";
};

const DialogTriggerCondition = (props: Props) => {
  const { type, CRUD } = props;
  const buttonDesign = {
    POT: [
      <DialogTrigger
        className="bg-greyDark text-white p-3 text-[.8rem] rounded-md"
        key="POST-button"
      >
        + Add New {type[0].toUpperCase() + type.toLowerCase().slice(1)}
      </DialogTrigger>,
      <DialogTrigger className="text-greyDark" key="budget_icon">
        <BiDotsVerticalRounded key="pot-icon" />
      </DialogTrigger>,
    ],
    BUDGET: [
      <DialogTrigger
        className="bg-greyDark text-white p-3 text-[.8rem] rounded-md"
        key="POST-button"
      >
        + Add New {type[0].toUpperCase() + type.toLowerCase().slice(1)}
      </DialogTrigger>,
      <DialogTrigger className="text-greyDark" key="budget_icon">
        <BiDotsVerticalRounded />
      </DialogTrigger>,
    ],
  };

  const button =
    CRUD === "POST" ? buttonDesign[type][0] : buttonDesign[type][1];

  return <div>{button}</div>;
};

export default DialogTriggerCondition;
