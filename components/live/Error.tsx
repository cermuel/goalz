import { ThemeContext } from "@/pages/_app";
import React, { useContext } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Error = ({ message }: any) => {
  const { mode } = useContext(ThemeContext);
  return (
    <div
      className={`${
        mode == "dark" && "bg-[#111]"
      } w-screen h-screen flex justify-center items-center`}
    >
      <h1 className="text-pry-color font-semibold text-2xl">{message}</h1>
    </div>
  );
};

export default Error;
