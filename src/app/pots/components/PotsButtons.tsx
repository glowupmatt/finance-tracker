import React from "react";
import { PotType } from "@/types/PotTypes";
import AddTransaction from "./addTransaction/AddTransaction";

type Props = {
  pot: PotType;
};

const PotsButtons = ({ pot }: Props) => {
  return (
    <div className="flex w-full items-center justify-center gap-5">
      <AddTransaction isDeposit={true} pot={pot} />
      <AddTransaction isDeposit={false} pot={pot} />
    </div>
  );
};

export default PotsButtons;
