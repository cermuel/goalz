import Button from "@/components/Button";
import Input from "@/components/Input";
import { ValidateEmail, ValidatePasswordStrength } from "@/functions";
import { LoginUser, RegisterUser, ResetPassword } from "@/functions/api";
import { InputType, RegisterUserType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { Toaster } from "react-hot-toast";
import { ThemeContext } from "./_app";

const Index = () => {
  const router = useRouter();
  const { mode } = useContext(ThemeContext);
  const navigate = () => router.push("/");
  const [strong, setstrong] = useState<boolean>(true);
  const [loading, setloading] = useState(false);
  const [registerDetails, setregisterDetails] = useState<RegisterUserType>({
    name: "",
    email: "",
    password: "",
  });
  const [c_password, setc_password] = useState<string>("");

  return (
    <main
      className={` ${
        mode == "dark" && "bg-[#111]"
      } h-screen w-screen justify-center items-center flex`}
    >
      <div className="px-8 sm:h-[600px] w-full sm:w-[450px] flex items-center flex-col justify-center flex-wrap">
        <Toaster />
        <h1 className="text-left flex flex-col w-full text-pry-color px-2 text-3xl mb-6 font-bold">
          Create an Account
          <span className="text-xs font-normal text-gray-400">
            Create an account and never miss a single sport update
          </span>
        </h1>
        <Input
          type={"text"}
          placeholder={"Full Name"}
          label="Full Name"
          error={false}
          onChange={(e: any) =>
            setregisterDetails({ ...registerDetails, name: e.target.value })
          }
        />
        <Input
          type={"email"}
          label="Email"
          placeholder={"Email Address"}
          error={
            registerDetails.email == ""
              ? false
              : !ValidateEmail(registerDetails.email)
          }
          onChange={(e: any) =>
            setregisterDetails({ ...registerDetails, email: e.target.value })
          }
        />
        <Input
          type={"password"}
          label="Password"
          placeholder={"Password"}
          error={!strong}
          onChange={(e: any) => {
            setregisterDetails({
              ...registerDetails,
              password: e.target.value,
            });
            setstrong(ValidatePasswordStrength(e.target.value).strong);
          }}
        />
        <Input
          type={"password"}
          label="Confirm Password"
          placeholder={"Confirm Password"}
          error={c_password !== registerDetails.password}
          onChange={(e: any) => setc_password(e.target.value)}
        />
        <Button
          onClick={() => RegisterUser(registerDetails, navigate, setloading)}
          text="Create Account"
          loading={loading}
        />
        <Link className="text-sm mt-1 text-pry-color ml-auto" href={"/"}>
          Already have an account?
        </Link>
      </div>
    </main>
  );
};

export default Index;
