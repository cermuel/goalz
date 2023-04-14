import MatchCard from "@/components/live/Home/MatchCard";
import ViewAll from "@/components/live/Home/ViewAll";
import Heading from "@/components/live/Heading";
import LiveLayout from "@/components/live/LiveLayout";
import { GetAllMatches, GetAllNews, GetLeagueTeams } from "@/functions/api";
import { matchEvents, NewsRedirectType, redirect } from "@/types";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../_app";
import Loading from "@/components/live/Loading";
import Error from "@/components/live/Error";
import { useRouter } from "next/router";
import NewsCard from "@/components/live/News/NewsCard";
import TeamCard from "@/components/live/Teams/TeamCard";

const Home = () => {
  const { mode } = useContext(ThemeContext);
  const router = useRouter();
  const [loadingMatches, setloadingMatches] = useState<boolean>(false);
  const [errorMatches, seterrorMatches] = useState<any>();
  const [dataMatches, setdataMatches] = useState<any>();

  const [newsData, setnewsData] = useState<any>();
  const [newsError, setnewsError] = useState<any>();
  const [newsLoading, setnewsLoading] = useState<boolean>(false);

  const [teams, setteams] = useState<any>();
  const [teamsError, setteamsError] = useState<any>();
  const [teamsLoading, setteamsLoading] = useState<boolean>(false);
  const [teamsArr, setteamsArr] = useState<any>();

  useEffect(() => {
    if (dataMatches == undefined || newsData == undefined) {
      GetAllMatches(setdataMatches, seterrorMatches, setloadingMatches);
      GetAllNews(setnewsData, setnewsError, setnewsLoading);
      GetLeagueTeams("eng", setteamsArr, setteamsError, setteamsLoading);
      setteams(teamsArr?.sports[0]?.leagues[0]?.teams);
    } else {
      setteams(teamsArr?.sports[0]?.leagues[0]?.teams);
    }
  }, [dataMatches, newsData]);

  if (dataMatches && teams && newsData) {
    return (
      <LiveLayout>
        <main
          className={`w-full min-h-screen sm:p-12 px-6 py-12  ${
            mode == "dark" && "bg-[#111]"
          }`}
        >
          <div className="w-full rounded-md h-60 bg-pry-color"></div>
          <section className="my-8 py-4">
            <div className="flex justify-between w-full items-center">
              <Heading heading="Teams" />
              <ViewAll action={() => router.push("/live/teams")} />
            </div>
            <div>
              {teams.slice(12, 20).map((team: any) => {
                return (
                  <TeamCard
                    id={team?.team?.id}
                    image={
                      team?.team?.logos?.length > 0 && team.team.logos[0].href
                    }
                    name={team?.team?.name}
                    slug={team?.team?.slug.split(".")[0]}
                  />
                );
              })}
            </div>
          </section>
          <section className="my-8">
            <div className="flex justify-between items-center py-2">
              <Heading heading="Recent Matches" />
              <ViewAll action={() => router.push("/live/matches")} />
            </div>
            <div className="flex flex-col gap-2">
              {dataMatches?.events.slice(0, 10).map((matches: any) => {
                const match = matches.competitions[0].competitors;

                var d = new Date(matches.competitions[0].startDate);

                console.log(matches.status.type.detail.length);

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
                    venue: matches.competitions[0]?.venue?.fullName,
                    status:
                      matches.status.type.detail == "FT" ||
                      matches.status.type.detail == "HT"
                        ? matches.status.type.detail
                        : matches.status.type.detail.length == 3
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
                      matches.status.type.detail == "FT" ||
                      matches.status.type.detail == "HT"
                        ? matches.status.type.detail
                        : matches.status.type.detail.length == 3
                        ? matches.status.type.detail
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
          <section className="my-8 py-4">
            <div className="flex justify-between items-center">
              <Heading heading="Latest News" />
              <ViewAll action={() => router.push("/live/news")} />
            </div>
            <div>
              {newsData?.articles?.map((article: any) => {
                var d = new Date(article.published);

                const articleDate =
                  d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
                const newsRedirect: NewsRedirectType = {
                  path: "/live/news/singlenews",
                  newsData: {
                    image: article.images?.length > 0 && article.images[0].url,
                    headline: article.headline,
                    description: article.description,
                    link: article?.links?.web?.href,
                    datePublished: articleDate,
                    category: "sport",
                  },
                };
                return (
                  <NewsCard
                    key={article?.headline}
                    headline={article?.headline}
                    date={articleDate}
                    action={newsRedirect}
                    image={article.images.length > 0 && article.images[0].url}
                  />
                );
              })}
            </div>
          </section>
        </main>
      </LiveLayout>
    );
  } else if (errorMatches) {
    return <Error message={errorMatches?.message} />;
  } else {
    return <Loading />;
  }
};

export default Home;
