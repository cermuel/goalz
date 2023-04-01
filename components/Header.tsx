import { ThemeContext } from "@/pages/_app";
import React, { useContext } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const Header = () => {
  const { mode, switchMode } = useContext(ThemeContext);
  return (
    <div className="fixed top-2 right-2">
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
