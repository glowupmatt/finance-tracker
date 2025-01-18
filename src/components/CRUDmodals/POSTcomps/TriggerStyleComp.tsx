import { DialogTrigger } from "@/components/ui/dialog";
import React from "react";

type Props = {
  type: "POT" | "BUDGET" | "TRANSACTION";
  CRUD: "POST" | "PUT" | "DELETE";
};

const TriggerStyleComp = (props: Props) => {
  const { type, CRUD } = props;

  if (CRUD === "DELETE") {
    return (
      <DialogTrigger className="text-secondaryRed" key="DELETE-button">
        Delete {type[0].toUpperCase() + type.toLowerCase().slice(1)}
      </DialogTrigger>
    );
  }

  if (CRUD == "PUT") {
    return (
      <DialogTrigger className="text-greyDark" key="budget_icon">
        <p>Edit {type[0].toUpperCase() + type.toLowerCase().slice(1)}</p>
      </DialogTrigger>
    );
  }

  return (
    <DialogTrigger
      className="bg-greyDark text-white p-3 text-[.8rem] rounded-md"
      key="POST-button"
    >
      + Add New {type[0].toUpperCase() + type.toLowerCase().slice(1)}
    </DialogTrigger>
  );
};

export default TriggerStyleComp;
