import { translateColorToHex } from "@/utils/translateColorToHex";
import React from "react";

const ColorSideTab = ({ color }: { color: string }) => {
  return (
    <div
      className={`w-full max-w-[4px] h-[43px] border-none rounded-lg`}
      style={{ backgroundColor: translateColorToHex(color) }}
    />
  );
};

export default ColorSideTab;
