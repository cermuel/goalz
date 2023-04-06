import GoBack from "@/components/GoBack";
import Error from "@/components/live/Error";
import Heading from "@/components/live/Heading";
import MatchCard from "@/components/live/Home/MatchCard";
import LiveLayout from "@/components/live/LiveLayout";
import Loading from "@/components/live/Loading";
import TeamCard from "@/components/Teams/TeamCard";
import TeamCardSmall from "@/components/Teams/TeamCardSmall";
import { GetLeagueTeams } from "@/functions/api";
import { ThemeContext } from "@/pages/_app";
import React, { useContext, useEffect, useState } from "react";

const Teams = () => {
  const { mode } = useContext(ThemeContext);
  //PL STATES
  const [englishTeams, setenglishTeams] = useState<any>();
  const [englishError, setenglishError] = useState<any>();
  const [englishLoading, setenglishLoading] = useState<boolean>(false);

  //LA LIGA STATES
  const [laligaTeams, setlaligaTeams] = useState<any>();
  const [laligaError, setlaligaError] = useState<any>();
  const [laligaLoading, setlaligaLoading] = useState<boolean>(false);

  //Bundesliga Teams
  const [bundesligaTeams, setbundesligaTeams] = useState<any>();
  const [bundesligaError, setbundesligaError] = useState<any>();
  const [bundesligaLoading, setbundesligaLoading] = useState<boolean>(false);

  //SERIE A STATES
  const [serieTeams, setserieTeams] = useState<any>();
  const [serieError, setserieError] = useState<any>();
  const [serieLoading, setserieLoading] = useState<boolean>(false);

  //LIGUE 1 STATES
  const [ligueTeams, setligueTeams] = useState<any>();
  const [ligueError, setligueError] = useState<any>();
  const [ligueLoading, setligueLoading] = useState<any>();

  // PORTUGAL LEAGUE
  const [portugalTeams, setportugalTeams] = useState<any>();
  const [portugalError, setportugalError] = useState<any>();
  const [portugalLoading, setportugalLoading] = useState<boolean>(false);

  //RUSSIA LEAGUE
  const [russiaTeams, setrussiaTeams] = useState<any>();
  const [rusiaError, setrusiaError] = useState<any>();
  const [russiaLoading, setrussiaLoading] = useState<boolean>(false);

  const [netherlandTeams, setnetherlandTeams] = useState<any>();
  const [netherlandsError, setnetherlandsError] = useState<any>();
  const [netherlandsLoading, setnetherlandsLoading] = useState<boolean>(false);

  const leagues = [
    {
      league: "eng",
      league_value: englishTeams,
      league_data: setenglishTeams,
      league_error: setenglishError,
      league_loading: setenglishLoading,
    },
    {
      league: "esp",
      league_value: laligaTeams,
      league_data: setlaligaTeams,
      league_error: setlaligaError,
      league_loading: setlaligaLoading,
    },
    {
      league: "ger",
      league_value: bundesligaTeams,
      league_data: setbundesligaTeams,
      league_error: setbundesligaError,
      league_loading: setbundesligaLoading,
    },
    {
      league: "ita",
      league_value: serieTeams,
      league_data: setserieTeams,
      league_error: setserieError,
      league_loading: setserieLoading,
    },
    {
      league: "fra",
      league_value: ligueTeams,
      league_data: setligueTeams,
      league_error: setligueError,
      league_loading: setligueLoading,
    },
    {
      league: "ned",
      league_value: netherlandTeams,
      league_data: setnetherlandTeams,
      league_error: setnetherlandsError,
      league_loading: setnetherlandsLoading,
    },
    {
      league: "por",
      league_value: portugalTeams,
      league_data: setportugalTeams,
      league_error: setportugalError,
      league_loading: setportugalLoading,
    },
    {
      league: "rus",
      league_value: russiaTeams,
      league_data: setrussiaTeams,
      league_error: setrusiaError,
      league_loading: setrussiaLoading,
    },
  ];
  useEffect(() => {
    if (
      englishTeams == undefined ||
      laligaTeams == undefined ||
      bundesligaTeams == undefined ||
      russiaTeams
    ) {
      leagues.map((league: any) => {
        GetLeagueTeams(
          league.league,
          league.league_data,
          league.league_error,
          league.league_loading
        );
      });
    }
  }, []);
  if (
    englishTeams &&
    laligaTeams &&
    bundesligaTeams &&
    ligueTeams &&
    serieTeams &&
    netherlandTeams &&
    portugalTeams &&
    russiaTeams
  ) {
    return (
      <LiveLayout>
        <main
          className={`w-full min-h-screen sm:p-12 px-6 py-12  ${
            mode == "dark" && "bg-[#111]"
          } items-center flex flex-col relative`}
        >
          <>
            <GoBack />
            {leagues.map((leagueArr: any, key: number) => {
              return (
                <React.Fragment key={key}>
                  {leagueArr?.league_value?.sports[0]?.leagues?.map(
                    (league: any) => {
                      return (
                        <section
                          className="w-full my-6"
                          key={league?.shortName}
                        >
                          <Heading heading={league?.shortName} />
                          {league?.teams?.map((team: any) => {
                            return (
                              <TeamCardSmall
                                key={team?.team?.id}
                                id={team?.team?.id}
                                image={
                                  team?.team?.logos?.length > 0 &&
                                  team.team.logos[0].href
                                }
                                name={team?.team?.name}
                                slug={team?.team?.slug?.split(".")[0]}
                              />
                            );
                          })}
                        </section>
                      );
                    }
                  )}
                </React.Fragment>
              );
            })}
          </>
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
    rusiaError ||
    netherlandsError
  ) {
    return (
      <Error
        message={
          englishError?.message ? englishError.message : "An Error Occured"
        }
      />
    );
  } else {
    return <Loading />;
  }
};

export default Teams;
