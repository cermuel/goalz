import { ThemeContext } from "@/pages/_app";
import { MatchCardType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

const MatchCard = (Match: MatchCardType) => {
  const { mode } = useContext(ThemeContext);
  // console.log(JSON.stringify(Match.redirect.matchData));
  return (
    <Link
      href={{
        pathname: Match.redirect.path,
        query: Match.redirect.matchData,
      }}
    >
      <section
        className={`w-full h-20 ${
          mode == "dark" ? "bg-gray-800" : "bg-gray-200"
        } rounded-md flex flex-col justify-center pl-14 max-sm:pl-12 px-4 items-end relative cursor-pointer`}
      >
        <div
          className={`absolute left-2 ${
            mode == "light" ? "text-gray-800" : "text-gray-200"
          } font-bold text-sm max-sm:text-[10px] `}
        >
          {Match.status}
        </div>
        <div className="h-[40%] w-full flex justify-between">
          <div
            className={`${
              mode == "light" ? "text-gray-800" : "text-gray-200"
            } font-medium flex gap-2 items-center ${
              Match.homeWinner && "text-green-600 font-semibold"
            }  `}
          >
            <Image
              width={20}
              height={10}
              alt={"Team Image"}
              className="object-contain w-auto h-auto bg-contain"
              src={Match.homeTeamImageUrl}
            />{" "}
            {Match.homeTeamName}
          </div>
          <div
            className={` ${
              mode == "light" ? "text-gray-800" : "text-gray-200"
            } font-semibold ${
              Match.homeWinner && "text-green-600 font-semibold"
            } `}
          >
            {Match.homeTeamGoals}
          </div>
        </div>
        <div className="h-[40%] w-full flex justify-between">
          <div
            className={`${
              mode == "light" ? "text-gray-800" : "text-gray-200"
            } font-medium flex gap-2 items-center ${
              Match.awayWinner && "text-green-600 font-semibold"
            } `}
          >
            <Image
              width={20}
              height={10}
              alt={"Team Image"}
              className="object-contain w-auto h-auto bg-contain"
              src={Match.awayTeamImageUrl}
            />{" "}
            {Match.awayTeamName}
          </div>
          <div
            className={` ${
              mode == "light" ? "text-gray-800" : "text-gray-200"
            } font-semibold ${
              Match.awayWinner && "text-green-600 font-semibold"
            } `}
          >
            {Match.awayTeamGoals}
          </div>
        </div>
      </section>
    </Link>
  );
};

export default MatchCard;
