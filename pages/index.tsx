import { LoginUser, RegisterUser, ResetPassword } from "@/functions";
import React from "react";
import { Toaster } from "react-hot-toast";

const Index = () => {
  const email = "ngene.samuel@lmu.edu.ng";
  const password = "123456789";
  const name = "Samuel Admin";
  return (
    <>
      <Toaster />
      <div
        className="underline"
        onClick={() => RegisterUser({ email, password, name })}
      >
        sign up
      </div>
      <div className="m-4" onClick={() => LoginUser({ email, password })}>
        login
      </div>
      <div className="font-bold" onClick={() => ResetPassword({ email })}>
        Password Reset Email
      </div>
    </>
  );
};

export default Index;
