import React from "react";
import { PotType } from "@/types/PotTypes";
import PotsHeader from "./PotsHeader";
import PotsData from "./PotsData";
import PotsButtons from "./PotsButtons";

type Props = {
  pot: PotType;
};

const PotsCard = (props: Props) => {
  const { pot } = props;

  return (
    <div className="flex flex-col gap-3 p-4 bg-white rounded-lg shadow-md md:gap-[2rem]">
      <PotsHeader pot={pot} />
      <PotsData pot={pot} />
      <PotsButtons pot={pot} />
    </div>
  );
};

export default PotsCard;
