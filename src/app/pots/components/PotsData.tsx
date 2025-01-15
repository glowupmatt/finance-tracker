import React from "react";
import { PotType } from "@/types/PotTypes";
import ProgressBar from "./ProgressBar";

type Props = {
  pot: PotType;
};

const PotsData = (props: Props) => {
  const { pot } = props;
  return (
    <>
      <ProgressBar pot={pot} />
    </>
  );
};

export default PotsData;
