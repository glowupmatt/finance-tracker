import React from "react";
import TriggerStyleComp from "./TriggerStyleComp";

type Props = {
  type: "POT" | "BUDGET" | "TRANSACTION";
  CRUD: "POST" | "PUT" | "DELETE";
};

const DialogTriggerCondition = (props: Props) => {
  const { type, CRUD } = props;
  const buttonDesign = {
    POT: [
      <TriggerStyleComp key="POST-button" type={"POT"} CRUD="POST" />,
      <TriggerStyleComp key="PUT_icon" type={"POT"} CRUD="PUT" />,
      <TriggerStyleComp key="DELETE-button" type={"POT"} CRUD="DELETE" />,
    ],
    BUDGET: [
      <TriggerStyleComp key="POST-button" type={"BUDGET"} CRUD="POST" />,
      <TriggerStyleComp key="PUT_icon" type={"BUDGET"} CRUD="PUT" />,
      <TriggerStyleComp key="DELETE-button" type={"BUDGET"} CRUD="DELETE" />,
    ],
    TRANSACTION: [
      <TriggerStyleComp key="POST-button" type={"TRANSACTION"} CRUD="POST" />,
      <TriggerStyleComp key="PUT_icon" type={"TRANSACTION"} CRUD="PUT" />,
      <TriggerStyleComp
        key="DELETE-button"
        type={"TRANSACTION"}
        CRUD="DELETE"
      />,
    ],
  };

  const button =
    CRUD === "POST"
      ? buttonDesign[type][0]
      : CRUD === "PUT"
      ? buttonDesign[type][1]
      : buttonDesign[type][2];

  return <div>{button}</div>;
};

export default DialogTriggerCondition;
