import { ThemeContext } from "@/pages/_app";
import React, { useContext } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  const { mode } = useContext(ThemeContext);
  return (
    <div
      className={`${
        mode == "dark" && "bg-[#111]"
      } w-screen h-screen flex justify-center items-center`}
    >
      <AiOutlineLoading3Quarters className="text-pry-color text-5xl animate-spin font-extrabold" />
    </div>
  );
};

export default Loading;
