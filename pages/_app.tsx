import Header from "@/components/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext<any>({});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [mode, switchMode] = useState<string>("dark");
  const [name, setname] = useState<string | null>("");
  useEffect(() => {
    if (localStorage.getItem("name")) {
      setname(localStorage.getItem("name"));
    } else {
      router.push("/");
    }
  }, [name]);

  return (
    <ThemeContext.Provider value={{ mode, switchMode, name }}>
      <Header />
      {/* <button onClick={()}>Set</button> */}
      <Component {...pageProps} />
    </ThemeContext.Provider>
  );
}
