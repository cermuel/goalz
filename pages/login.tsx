import ForgotPassword from "@/components/Auth/ForgotPassword";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { LoginUser } from "@/functions/api";
import { LoginUserType } from "@/types";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { Toaster } from "react-hot-toast";
import { ThemeContext } from "./_app";

const Login = () => {
  const router = useRouter();
  const { mode } = useContext(ThemeContext);
  const navigate = () => router.push("/live");
  const [loginDetails, setloginDetails] = useState<LoginUserType>({
    email: "",
    password: "",
  });
  const [loading, setloading] = useState(false);
  const [showfpass, setshowfpass] = useState(false);
  return (
    <main
      className={` ${
        mode == "dark" && "bg-[#111]"
      } h-screen w-screen justify-center items-center flex`}
    >
      {showfpass && <ForgotPassword setshowfpass={setshowfpass} />}
      <div className="px-8 sm:h-[600px] w-full sm:w-[400px] flex items-center flex-col justify-center flex-wrap">
        <Toaster />
        <h1 className="text-left flex flex-col w-full text-pry-color px-2 text-3xl mb-6 font-bold">
          Welcome Back 👋 ⚽️
        </h1>

        <Input
          type={"email"}
          label="Email"
          placeholder={"Email Address"}
          onChange={(e: any) =>
            setloginDetails({ ...loginDetails, email: e.target.value })
          }
        />
        <Input
          type={"password"}
          label="Password"
          placeholder={"Password"}
          onChange={(e: any) => {
            setloginDetails({
              ...loginDetails,
              password: e.target.value,
            });
          }}
        />

        <Button
          onClick={() => LoginUser(loginDetails, navigate, setloading)}
          text="Login"
          loading={loading}
        />
        <div className="w-full flex justify-between mt-1">
          <span
            className="text-sm text-pry-color cursor-pointer "
            onClick={() => setshowfpass(!showfpass)}
          >
            Forgot Password?
          </span>
          <Link className="text-sm text-pry-color" href={"/"}>
            Don't have an account?
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Login;
