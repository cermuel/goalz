import { ButtonType } from "@/types";
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const Button = (Button: ButtonType) => {
  return (
    <button
      className={`bg-pry-color flex justify-center cursor-pointer rounded-md text-white text-lg w-full mt-8 py-4 ${
        Button.loading && "opacity-40"
      } ${Button.disabled && "opacity-40"} `}
      onClick={Button.onClick}
      disabled={Button.loading || Button.disabled}
    >
      {Button.loading ? (
        <AiOutlineLoading3Quarters className="animate-spin text-lg" />
      ) : (
        Button.text
      )}
    </button>
  );
};

export default Button;
