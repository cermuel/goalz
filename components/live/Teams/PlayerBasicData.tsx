import { ThemeContext } from "@/pages/_app";
import React, { useContext } from "react";

const PlayerBasicData = ({ title, info }: { title: string; info: string }) => {
  const { mode } = useContext(ThemeContext);
  return (
    <div
      className={`flex text-sm gap-2 ${
        mode == "dark" ? "text-[#ddd]" : "text-[#222]"
      }`}
    >
      <span className={`uppercase text-gray-500`}>{title}</span>
      <span className={`font-bold`}>{info}</span>
    </div>
  );
};

export default PlayerBasicData;
