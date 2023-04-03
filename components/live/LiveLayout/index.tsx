import { ThemeContext } from "@/pages/_app";
import React, { useContext } from "react";
import Navbar from "./Navbar";

const LiveLayout = ({ children }: any) => {
  const { mode } = useContext(ThemeContext);
  return (
    <div className={`${mode == "dark" && "bg-[#111]"} sm:pl-72`}>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default LiveLayout;
