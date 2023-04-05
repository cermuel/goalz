import { ThemeContext } from "@/pages/_app";
import Image from "next/image";
import React, { useContext } from "react";
import { toast, Toaster } from "react-hot-toast";
import { FaTwitter } from "react-icons/fa";
import { FiShare, FiLink } from "react-icons/fi";
const Navbar = () => {
  const { mode, name } = useContext(ThemeContext);
  return (
    <div
      className={`${
        mode == "dark" && "bg-[#111]"
      } h-screen w-72 border-r-[1px] border-gray-500 z-50 fixed top-0 left-0 max-sm:hidden`}
    >
      {" "}
      <Toaster />
      <section className={`items-center flex flex-col w-full mt-16`}>
        <Image
          src={"https://img.icons8.com/bubbles/2x/guest-male.png"}
          className="rounded-full"
          width={100}
          height={100}
          alt={name}
        />
        <h1
          className={`${
            mode == "light" ? "text-[#111]" : "text-white"
          } font-semibold text-lg text-center`}
        >
          {" "}
          {name}
        </h1>
      </section>
      <section
        className={`w-full bottom-5 h-10 flex justify-center gap-4 items-center absolute`}
      >
        <a href="">
          <FaTwitter className="text-pry-color text-xl" />
        </a>
        <span
          onClick={async () => {
            await navigator.clipboard.writeText(location && location.href);
            toast.success("Link copied to clipboard");
          }}
        >
          <FiLink className="text-pry-color cursor-pointer text-xl" />
        </span>
        <a href="https://cermuel.vercel.app/">
          <FiShare className="text-pry-color text-xl" />
        </a>
      </section>
    </div>
  );
};

export default Navbar;
