import React from "react";
import { PotType } from "@/types/PotTypes";
import DialogPOST from "@/components/CRUDmodals/POSTcomps/DialogPOST";

type Props = {
  pot: PotType;
};

const PotsHeader = (props: Props) => {
  const { pot } = props;
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: pot.colorTag }}
        />
        <h2>{pot.title}</h2>
      </div>
      <DialogPOST type="POT" CRUD="PUT" potData={pot} />
    </div>
  );
};

export default PotsHeader;
