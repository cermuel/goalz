import { ThemeContext } from "@/pages/_app";
import { AthleteCardType } from "@/types";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { VscJersey } from "react-icons/vsc";

const AthletesCard = (athlete: AthleteCardType) => {
  const router = useRouter();
  const { mode } = useContext(ThemeContext);
  return (
    <div
      className="w-[49%] max-md:w-full my-1 py-1 px-4 flex justify-between "
      onClick={() =>
        router.push({
          pathname: "/live/teams/player",
          query: {
            height: athlete.dataToPass.height,
            weight: athlete.dataToPass.weight,
            DOB: athlete.dataToPass.DOB,
            country: athlete.dataToPass.country,
            countryImage: athlete.dataToPass.countryImage,
            gender: athlete.dataToPass.gender,
            active: athlete.dataToPass.active,
            links: JSON.stringify(athlete.dataToPass.link),
            name: athlete.dataToPass.name,
            age: athlete.age,
            jersey: athlete.jersey,
            position: athlete.dataToPass.position,
          },
        })
      }
    >
      <div className="flex items-center h-20 gap-2">
        <img
          src={`https://secure.cache.images.core.optasports.com/soccer/players/50x50/uuid_d0azo0spzov2hg6ul40l58e3u.png`}
          className="w-12 h-12 rounded-full"
          alt="Player"
        />
        <div>
          <p className={`font-medium text-pry-color`}>{athlete.name}</p>
          <p className={`text-gray-500 text-xs font-medium`}>
            Age {athlete.age}
          </p>
        </div>
      </div>
      <div className="h-20 relative flex justify-center items-center">
        <VscJersey
          className={`absolute top-[50%] ${
            mode == "dark" ? "text-gray-500" : "text-gray-500"
          } text-4xl z-50 translate-y-[-50%]`}
        />
        <p
          className={`absolute top-[50%] ${
            mode == "dark" ? "text-gray-200" : "text-gray-800"
          } text-[12px] font-medium z-50 translate-y-[-50%]`}
        >
          {athlete.jersey}
        </p>
      </div>
    </div>
  );
};

export default AthletesCard;
