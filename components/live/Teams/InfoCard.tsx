import { ThemeContext } from "@/pages/_app";
import { InfoCardType } from "@/types";
import React, { useContext } from "react";

const InfoCard = (Info: InfoCardType) => {
  const { mode } = useContext(ThemeContext);
  return (
    <div className="w-full flex border-b-2 gap-2 my-4 border-b-gray-500 h-10 items-center">
      <h1
        className={`${
          mode == "dark" ? "text-gray-200" : "text-gray-800"
        } capitalize text-lg font-semibold`}
      >
        {`${Info.name}:`}
      </h1>
      <p className="text-pry-color"> {Info.value}</p>
    </div>
  );
};

export default InfoCard;
