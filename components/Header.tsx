import { ThemeContext } from "@/pages/_app";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const Header = () => {
  const { mode, switchMode } = useContext(ThemeContext);
  const router = useRouter();

  return (
    <div className="fixed top-2 right-2 z-50">
      {mode == "light" ? (
        <MdDarkMode
          className="text-pry-color text-3xl cursor-pointer"
          onClick={() => switchMode("dark")}
        />
      ) : (
        <MdLightMode
          className="text-pry-color text-3xl cursor-pointer"
          onClick={() => switchMode("light")}
        />
      )}
    </div>
  );
};

export default Header;
