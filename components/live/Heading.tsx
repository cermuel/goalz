import { ThemeContext } from "@/pages/_app";
import React, { useContext } from "react";

const Heading = ({ heading }: any) => {
  const { mode } = useContext(ThemeContext);
  return (
    <h1 className={`${mode == "dark" && "text-white"} text-xl font-semibold`}>
      {heading}
    </h1>
  );
};

export default Heading;
