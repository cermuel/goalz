import GoBack from "@/components/GoBack";
import Error from "@/components/live/Error";
import Heading from "@/components/live/Heading";
import MatchCard from "@/components/live/Home/MatchCard";
import LiveLayout from "@/components/live/LiveLayout";
import Loading from "@/components/live/Loading";
import { GetLeagueMatches } from "@/functions/api";
import { ThemeContext } from "@/pages/_app";
import { redirect } from "@/types";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

const Matches = () => {
  const { mode } = useContext(ThemeContext);
  //PL STATES
  const [englishMatches, setenglishMatches] = useState<any>();
  const [englishError, setenglishError] = useState<any>();
  const [englishLoading, setenglishLoading] = useState<boolean>(false);

  //LA LIGA STATES
  const [laligaMatches, setlaligaMatches] = useState<any>();
  const [laligaError, setlaligaError] = useState<any>();
  const [laligaLoading, setlaligaLoading] = useState<boolean>(false);

  //Bundesliga Matches
  const [bundesligaMatches, setbundesligaMatches] = useState<any>();
  const [bundesligaError, setbundesligaError] = useState<any>();
  const [bundesligaLoading, setbundesligaLoading] = useState<boolean>(false);

  //SERIE A STATES
  const [serieMatches, setserieMatches] = useState<any>();
  const [serieError, setserieError] = useState<any>();
  const [serieLoading, setserieLoading] = useState<boolean>(false);

  //LIGUE 1 STATES
  const [ligueMatches, setligueMatches] = useState<any>();
  const [ligueError, setligueError] = useState<any>();
  const [ligueLoading, setligueLoading] = useState<any>();

  // PORTUGAL LEAGUE
  const [portugalMatches, setportugalMatches] = useState<any>();
  const [portugalError, setportugalError] = useState<any>();
  const [portugalLoading, setportugalLoading] = useState<boolean>(false);

  //RUSSIA LEAGUE
  const [russiaMatches, setrussiaMatches] = useState<any>();
  const [rusiaError, setrusiaError] = useState<any>();
  const [russiaLoading, setrussiaLoading] = useState<boolean>(false);

  const leagues = [
    {
      league: "eng",
      league_value: englishMatches,
      league_data: setenglishMatches,
      league_error: setenglishError,
      league_loading: setenglishLoading,
    },
    {
      league: "esp",
      league_value: laligaMatches,
      league_data: setlaligaMatches,
      league_error: setlaligaError,
      league_loading: setlaligaLoading,
    },
    {
      league: "ger",
      league_value: bundesligaMatches,
      league_data: setbundesligaMatches,
      league_error: setbundesligaError,
      league_loading: setbundesligaLoading,
    },
    {
      league: "ita",
      league_value: serieMatches,
      league_data: setserieMatches,
      league_error: setserieError,
      league_loading: setserieLoading,
    },
    {
      league: "fra",
      league_value: ligueMatches,
      league_data: setligueMatches,
      league_error: setligueError,
      league_loading: setligueLoading,
    },
    {
      league: "por",
      league_value: portugalMatches,
      league_data: setportugalMatches,
      league_error: setportugalError,
      league_loading: setportugalLoading,
    },
    {
      league: "rus",
      league_value: russiaMatches,
      league_data: setrussiaMatches,
      league_error: setrusiaError,
      league_loading: setrussiaLoading,
    },
  ];

  useEffect(() => {
    if (
      englishMatches == undefined ||
      laligaMatches == undefined ||
      bundesligaMatches == undefined
    ) {
      leagues.map((league: any) => {
        GetLeagueMatches(
          league.league,
          league.league_data,
          league.league_error,
          league.league_loading
        );
      });
    }
  }, [englishMatches, laligaMatches, bundesligaMatches]);

  if (
    englishMatches &&
    laligaMatches &&
    bundesligaMatches &&
    serieMatches &&
    portugalMatches &&
    ligueMatches &&
    russiaMatches
  ) {
    return (
      <LiveLayout>
        <main
          className={`w-full min-h-screen sm:p-12 px-6 py-12  ${
            mode == "dark" && "bg-[#111]"
          } flex flex-col gap-8 relative`}
        >
          <GoBack />
          {leagues.map((league: any, key: number) => {
            return (
              <section className="space-y-2" key={key}>
                <div className="flex items-center gap-2">
                  {mode == "dark" ? (
                    <Image
                      src={league.league_value?.leagues[0]?.logos[1]?.href}
                      alt="League"
                      width={40}
                      height={40}
                    />
                  ) : (
                    <Image
                      src={league.league_value?.leagues[0]?.logos[0]?.href}
                      alt="League"
                      width={40}
                      height={40}
                    />
                  )}
                  <Heading heading={league.league_value?.leagues[0]?.name} />
                </div>
                <div className="flex flex-col gap-2">
                  {league.league_value?.events
                    .slice(0, 10)
                    .map((matches: any) => {
                      const match = matches.competitions[0].competitors;

                      let d = new Date(matches.competitions[0].startDate);

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
                              ? "FT"
                              : `${d.getUTCHours() + 1}:${
                                  d.getUTCMinutes() == 0
                                    ? d.getUTCMinutes() + "0"
                                    : d.getUTCMinutes()
                                }`,
                          homeTeamOdds:
                            matches.competitions[0]?.odds?.length > 0 &&
                            matches.competitions[0]?.odds[0].homeTeamOdds
                              ?.value,
                          awayTeamOdds:
                            matches.competitions[0]?.odds?.length > 0 &&
                            matches.competitions[0]?.odds[0].awayTeamOdds
                              ?.value,
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
                          athlete:
                            details?.athletesInvolved?.length > 0 &&
                            details?.athletesInvolved[0].displayName,
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
                          status={
                            matches?.status.type.shortDetail == "FT"
                              ? "FT"
                              : `${d.getUTCHours() + 1}:${
                                  d.getUTCMinutes() == 0
                                    ? d.getUTCMinutes() + "0"
                                    : d.getUTCMinutes()
                                }`
                          }
                          redirect={redirect}
                        />
                      );
                    })}
                </div>
              </section>
            );
          })}
        </main>
      </LiveLayout>
    );
  } else if (
    englishError ||
    laligaError ||
    bundesligaError ||
    serieError ||
    ligueError ||
    portugalError ||
    rusiaError
  ) {
    return <Error />;
  } else {
    return <Loading />;
  }
};

export default Matches;
