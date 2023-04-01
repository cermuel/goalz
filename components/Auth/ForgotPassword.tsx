import React, { useContext, useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Button from "../Button";
import Input from "../Input";
import { MdOutlineCancel } from "react-icons/md";
import { ThemeContext } from "@/pages/_app";
import { ResetPassword } from "@/functions/api";
import { ValidateEmail } from "@/functions";

const ForgotPassword = ({ setshowfpass }: any) => {
  const { mode } = useContext(ThemeContext);
  const [email, setemail] = useState<string>("");
  const [disabled, setdisabled] = useState(true);
  useEffect(() => {
    if (email !== "" && ValidateEmail(email)) {
      setdisabled(false);
    } else {
      setdisabled(true);
    }
  }, [email]);

  return (
    <main
      className={`md:w-[400px] p-4 rounded-md absolute top-4 left-[50%] translate-x-[-50%] ${
        mode == "light"
          ? "shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
          : "shadow-[rgba(255,255,255,_0.24)_0px_3px_8px]"
      } `}
    >
      <MdOutlineCancel
        onClick={() => setshowfpass(false)}
        className=" text-pry-color text-xl top-2 right-2 absolute cursor-pointer"
      />
      <Toaster />
      <Input
        type={"email"}
        label="Email"
        placeholder={"Email Address"}
        error={email == "" ? false : !ValidateEmail(email)}
        onChange={(e: any) => setemail(e.target.value)}
      />
      <div className="">
        <Button
          onClick={() => ResetPassword({ email })}
          loading={false}
          text="Send Recovery Email"
          disabled={disabled}
        />
      </div>
    </main>
  );
};

export default ForgotPassword;
