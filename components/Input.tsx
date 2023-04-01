import { ThemeContext } from "@/pages/_app";
import { InputType } from "@/types";
import React, { useContext, useState } from "react";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";

const Input = (Input: InputType) => {
  const [show, setshow] = useState<boolean>(false);
  const { mode } = useContext(ThemeContext);
  return (
    <div className="w-full relative px-2 py-1 my-4">
      <label
        className={` ${Input.error && "text-error-color border-error-color"} ${
          mode == "dark" && "text-[#c0bdbd]"
        }  text-xs font-medium text-[#555454] focus:text-pry-color`}
      >
        {Input.label}
      </label>
      <div className="relative">
        <input
          type={
            Input.type != "password" ? Input.type : show ? "text" : "password"
          }
          onChange={Input.onChange}
          className={` ${
            Input.error &&
            "text-error-color border-error-color focus:text-error-color focus:border-error-color"
          } ${
            mode == "dark" && "text-[white]"
          } bg-transparent w-full text-lg focus:font-medium outline-none border-b-[1px] focus:text-pry-color  focus:border-pry-color`}
        />
        {Input.type == "password" &&
          (show ? (
            <RxEyeOpen
              className={` ${
                Input.error && "text-error-color"
              } absolute right-4 translate-y-[-50%] top-[50%] cursor-pointer animate-pulse`}
              onClick={() => setshow(!show)}
            />
          ) : (
            <RxEyeClosed
              className={` ${
                Input.error && "text-error-color"
              } absolute right-4 translate-y-[-50%] top-[50%] cursor-pointer animate-pulse`}
              onClick={() => setshow(!show)}
            />
          ))}
      </div>
    </div>
  );
};

export default Input;
