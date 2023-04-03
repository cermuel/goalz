import MatchCard from "@/components/live/Home/MatchCard";
import ViewAll from "@/components/live/Home/ViewAll";
import Heading from "@/components/live/Heading";
import LiveLayout from "@/components/live/LiveLayout";
import { GetAllMatches } from "@/functions/api";
import { matchEvents, redirect } from "@/types";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../_app";
import Loading from "@/components/live/Loading";
import Error from "@/components/live/Error";
import { useRouter } from "next/router";

const Home = () => {
  const { mode } = useContext(ThemeContext);
  const router = useRouter();
  const [loadingMatches, setloadingMatches] = useState<boolean>(false);
  const [errorMatches, seterrorMatches] = useState<any>();
  const [dataMatches, setdataMatches] = useState<any>();

  useEffect(() => {
    if (dataMatches == undefined) {
      GetAllMatches(setdataMatches, seterrorMatches, setloadingMatches);
    } else {
    }
  }, [dataMatches]);

  if (dataMatches) {
    return (
      <LiveLayout>
        <main
          className={`w-full min-h-screen sm:p-12 px-6 py-12  ${
            mode == "dark" && "bg-[#111]"
          }`}
        >
          <div className="w-full rounded-md h-60 bg-pry-color"></div>
          <section className="my-8 py-4">
            <div className="flex justify-between items-center">
              <Heading heading="Leagues" />
              <ViewAll action={() => alert("clicked")} />
            </div>
            <div></div>
          </section>
          <section className="my-8">
            <div className="flex justify-between items-center py-2">
              <Heading heading="Recent Scores" />
              <ViewAll action={() => router.push("/live/matches")} />
            </div>
            <div className="flex flex-col gap-2">
              {dataMatches?.events.slice(0, 10).map((matches: any) => {
                const match = matches.competitions[0].competitors;

                var d = new Date(matches.competitions[0].startDate);

                console.log(matches);

                const redirect: redirect = {
                  path: "/live/matches/match",
                  matchData: {
                    homeTeamGoals: match[0].score,
                    awayTeamGoals: match[1].score,
                    homeTeamForm: match[0].form,
                    awayTeamForm: match[1].form,
                    homeTeamName: match[0].team.shortDisplayName,
                    awayTeamName: match[1].team.shortDisplayName,
                    homeTeamImageUrl: match[0].team.logo,
                    awayTeamImageUrl: match[1].team.logo,
                    competition: "",
                    headline:
                      matches.competitions[0]?.headlines?.length > 0 &&
                      matches.competitions[0]?.headlines[0].description,
                    venue: matches.competitions[0]?.venue.fullName,
                    status:
                      matches.status.type.detail == "FT"
                        ? matches.status.type.detail
                        : `${d.getUTCHours() + 1}:${
                            d.getUTCMinutes() == 0
                              ? d.getUTCMinutes() + "0"
                              : d.getUTCMinutes()
                          }`,
                    homeTeamOdds:
                      matches.competitions[0]?.odds?.length > 0 &&
                      matches.competitions[0]?.odds[0].homeTeamOdds?.value,
                    awayTeamOdds:
                      matches.competitions[0]?.odds?.length > 0 &&
                      matches.competitions[0]?.odds[0].awayTeamOdds?.value,
                    drawOdds:
                      matches.competitions[0]?.odds?.length > 0 &&
                      matches.competitions[0]?.odds[0].drawOdds?.value,
                    matchEvents: [
                      {
                        athlete: "",
                        time: "",
                        eventType: "",
                        homeTeam: false,
                      },
                    ],
                  },
                };
                matches.competitions[0]?.details.map((details: any) => {
                  redirect.matchData.matchEvents.push({
                    athlete: details?.athletesInvolved[0].displayName,
                    time: details?.clock.displayValue,
                    eventType: details?.type.text,
                    homeTeam: details?.team.id == match[0].id,
                  });
                });
                return (
                  <MatchCard
                    key={matches.id}
                    awayTeamGoals={match[1].score}
                    homeTeamGoals={match[0].score}
                    awayTeamName={match[1].team.name}
                    homeTeamName={match[0].team.name}
                    awayTeamImageUrl={match[1].team.logo}
                    homeTeamImageUrl={match[0].team.logo}
                    awayWinner={match[1].winner}
                    homeWinner={match[0].winner}
                    status={`${d.getUTCHours() + 1}:${
                      d.getUTCMinutes() == 0
                        ? d.getUTCMinutes() + "0"
                        : d.getUTCMinutes()
                    }`}
                    redirect={redirect}
                  />
                );
              })}
            </div>
          </section>
          <section className="my-8 py-4">
            <div className="flex justify-between items-center">
              <Heading heading="Latest News" />
              <ViewAll action={() => alert("clicked")} />
            </div>
            <div></div>
          </section>
        </main>
      </LiveLayout>
    );
  } else if (errorMatches) {
    return <Error message={errorMatches.message} />;
  } else {
    return <Loading />;
  }
};

export default Home;
