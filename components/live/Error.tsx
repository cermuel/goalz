import { ThemeContext } from "@/pages/_app";
import React, { useContext } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Error = () => {
  const { mode } = useContext(ThemeContext);
  return (
    <div
      className={`${
        mode == "dark" && "bg-[#111]"
      } w-screen h-screen flex justify-center items-center`}
    >
      <h1 className="text-pry-color font-semibold text-2xl">
        An Error Occured
      </h1>
    </div>
  );
};

export default Error;
