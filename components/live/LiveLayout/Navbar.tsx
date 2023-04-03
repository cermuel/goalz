import { ThemeContext } from "@/pages/_app";
import React, { useContext } from "react";

const Navbar = () => {
  const { mode } = useContext(ThemeContext);
  return (
    <div
      className={`${
        mode == "dark" && "bg-[#111]"
      } h-screen w-72 border-r-[1px] border-gray-500 fixed top-0 left-0 max-sm:hidden`}
    ></div>
  );
};

export default Navbar;
