import GoBack from "@/components/GoBack";
import LiveLayout from "@/components/live/LiveLayout";
import PlayerBasicData from "@/components/live/Teams/PlayerBasicData";
import { ThemeContext } from "@/pages/_app";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useLayoutEffect } from "react";
import { AthleteDataToPassType } from "@/types";

const Player = () => {
  const router = useRouter();
  let player: AthleteDataToPassType | any = router.query;
  useLayoutEffect(() => {
    if (typeof router.query.links == "string") {
      player = JSON.parse(router.query.links);
    }
  }, []);

  console.log(player);

  const { mode } = useContext(ThemeContext);
  if (player) {
    return (
      <LiveLayout>
        <main
          className={`w-full min-h-screen sm:p-12 px-6 py-12  ${
            mode == "dark" && "bg-[#111]"
          } items-center flex flex-col relative`}
        >
          <GoBack />
          <section className="flex flex-wrap w-full justify-around items-center gap-4">
            <div className="flex max-sm:justify-center max-sm:w-full">
              <Image
                src={
                  "https://goalzzz.vercel.app/_next/image?url=https%3A%2F%2Fa.espncdn.com%2Fi%2Fteamlogos%2Fsoccer%2F500%2F382.png&w=128&q=75"
                }
                alt=""
                width={60}
                height={60}
              />{" "}
              <Image
                src={player.countryImage}
                alt=""
                className="skew-y-6 skew-x-3"
                width={60}
                height={40}
              />
            </div>
            <div className="max-sm:justify-center max-sm:w-full">
              <h1
                className={`${
                  mode == "dark" ? "text-gray-200" : "text-gray-800"
                } text-center text-3xl max-md:text-2xl max-sm:text-xl flex flex-col font-bold`}
              >
                <span className="font-normal">
                  {player.name?.split(" ")[0]}
                </span>
                {player.name?.split(" ")[1]}
              </h1>
            </div>
            <div
              className={`gap-2 text-sm flex ${
                mode == "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <span>MAN CITY</span>
              <span>.</span>
              <span>#{player.jersey}</span>
              <span>.</span>
              <span>{player.position}</span>
            </div>
            <div
              className={`flex flex-col px-2 border-l-[1px] border-l-gray-500 gap-2`}
            >
              <PlayerBasicData
                title="HT/WT"
                info={`${player.height}, ${player.weight}`}
              />
              <PlayerBasicData
                title="BIRTHDATE"
                info={`${player.DOB} (${player.age})`}
              />
              <PlayerBasicData title="NATIONALITY" info={`${player.country}`} />
            </div>
          </section>
        </main>
      </LiveLayout>
    );
  }
};

export default Player;
