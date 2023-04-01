import React, { useContext } from "react";
import { ThemeContext } from "../_app";

const Home = () => {
  const { mode } = useContext(ThemeContext);
  return (
    <main
      className={`flex w-screen h-screen justify-center items-center ${
        mode == "dark" && "bg-black"
      }`}
    >
      <h1 className={`text-xl font-bold  ${mode == "dark" && "text-white"} `}>
        Page not ready yet!!! 👷🏾‍♂️🚧
      </h1>
    </main>
  );
};

export default Home;
