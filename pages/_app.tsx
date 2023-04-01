import Header from "@/components/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, useState } from "react";

export const ThemeContext = createContext<any>({});

export default function App({ Component, pageProps }: AppProps) {
  const [mode, switchMode] = useState<string>("light");
  return (
    <ThemeContext.Provider value={{ mode, switchMode }}>
      <Header />
      {/* <button onClick={()}>Set</button> */}
      <Component {...pageProps} />
    </ThemeContext.Provider>
  );
}
