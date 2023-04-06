import { ThemeContext } from "@/pages/_app";
import { TeamCardType } from "@/types";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { AiOutlineRight } from "react-icons/ai";

const TeamCardSmall = (Team: TeamCardType) => {
  const { mode } = useContext(ThemeContext);
  const router = useRouter();
  return (
    <main
      className={`w-full h-12 ${
        mode == "dark" ? "border-b-gray-700" : "border-b-gray-300"
      } border-b-[1px] rounded-md flex justify-between items-center relative cursor-pointer`}
    >
      <div className="flex items-center gap-2">
        {" "}
        <Image
          src={`${Team.image}`}
          alt={`${Team.name}`}
          width={30}
          height={30}
        />
        <h1
          className={`${
            mode == "dark" ? "text-gray-300" : "text-gray-700"
          } font-medium text-sm`}
        >
          {Team.name}
        </h1>
      </div>
      <div>
        <AiOutlineRight
          className={`${
            mode == "dark" ? "text-gray-200" : "text-gray-800"
          } text-lg`}
          onClick={() =>
            router.push({
              pathname: "/live/teams/team",
              query: { id: Team.id.toString(), slug: Team.slug },
            })
          }
        />
      </div>
    </main>
  );
};

export default TeamCardSmall;
