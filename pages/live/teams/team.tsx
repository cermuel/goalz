import GoBack from "@/components/GoBack";
import Heading from "@/components/live/Heading";
import LiveLayout from "@/components/live/LiveLayout";
import Loading from "@/components/live/Loading";
import AthletesCard from "@/components/live/Teams/AthletesCard";
import InfoCard from "@/components/live/Teams/InfoCard";
import RecordCard from "@/components/live/Teams/RecordCard";
import { getAthleteDOBFormat } from "@/functions";
import { GetSingleTeam } from "@/functions/api";
import { ThemeContext } from "@/pages/_app";
import {
  AthleteCardType,
  AthleteDataToPassType,
  RecordCardType,
} from "@/types";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";

const Team = () => {
  const router = useRouter();
  const { id, slug } = router.query;
  const { mode } = useContext(ThemeContext);
  const [team, setTeam] = useState<any>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [newColor, setnewColor] = useState<string>("");
  const [sides, setsides] = useState("Info");
  const [athletes, setathletes] = useState<any[]>([]);
  const sidesArr: string[] = ["Info", "Players", "Records"];

  useLayoutEffect(() => {
    if (id && slug) {
      if (team == undefined) {
        GetSingleTeam(
          id as string,
          slug as string,
          setTeam,
          setError,
          setLoading
        );
      } else {
        setnewColor(`#${team?.team.color}`);
        setathletes(team.team.athletes);
      }
    }
  }, [id, slug, team]);

  console.log(athletes);
  if (team && newColor) {
    return (
      <LiveLayout>
        {" "}
        <main
          className={`w-full min-h-screen sm:p-12 px-6 py-12  ${
            mode == "dark" && "bg-[#111]"
          } items-center flex flex-col relative`}
        >
          <GoBack />
          <section
            className={`bg-[${newColor}] mb-4 w-full h-30 flex justify-center rounded-md items-center`}
          >
            <Image
              src={team.team?.logos[0].href}
              width={90}
              height={90}
              alt="IMAGE"
              priority={true}
            />
          </section>
          <div className="flex gap-2 items-center">
            <Heading heading={team.team?.name} />
            <span className="text-gray-500 text-xs">
              {`(${team.team?.standingSummary})`}
            </span>
          </div>
          <section className="flex justify-between w-full mt-4">
            {sidesArr.map((side: string) => {
              const activeSide = side == sides;
              return (
                <div
                  key={side}
                  className={`w-full text-center cursor-pointer text-lg ${
                    activeSide
                      ? "text-pry-color border-b-2 border-b-pry-color font-bold"
                      : "text-gray-500"
                  } `}
                  onClick={() => setsides(side)}
                >
                  {side}
                </div>
              );
            })}
          </section>
          <section className="w-full">
            {sides == "Info" ? (
              <div className="w-full">
                <InfoCard name="Nickname" value={team.team?.nickname} />
                <InfoCard
                  name="League"
                  value={team.team?.defaultLeague?.shortName}
                />
                <InfoCard name="Standing" value={team.team?.standingSummary} />
                <InfoCard
                  name="Active"
                  value={team.team?.isActive ? "Yes" : "No"}
                />
                <InfoCard
                  name="Next Match"
                  value={team.team?.nextEvent[0].shortName}
                />
              </div>
            ) : sides == "Players" ? (
              <div className="flex flex-wrap justify-between">
                {athletes
                  ?.slice(0)
                  .reverse()
                  .map((athlete: any) => {
                    const dataToPass: AthleteDataToPassType = {
                      height: athlete.displayHeight,
                      weight: athlete.displayWeight,
                      country: athlete.citizenship,
                      countryImage: athlete.flag.href,
                      active: athlete.active,
                      gender: athlete.gender,
                      DOB: getAthleteDOBFormat(athlete.dateOfBirth),
                      position: athlete.position.name,
                      link: athlete.links,
                    };
                    return (
                      <AthletesCard
                        name={athlete.displayName}
                        jersey={athlete?.jersey}
                        age={athlete.age}
                        dataToPass={dataToPass}
                      />
                    );
                  })}
              </div>
            ) : (
              <div className="w-full mt-4">
                {team.team?.record?.items?.length > 0 &&
                  team.team?.record?.items[0]?.stats.map(
                    (stat: RecordCardType) => {
                      return <RecordCard value={stat.value} name={stat.name} />;
                    }
                  )}
              </div>
            )}
          </section>
        </main>
      </LiveLayout>
    );
  } else {
    return <Loading />;
  }
};

export default Team;
