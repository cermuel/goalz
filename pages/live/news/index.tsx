import GoBack from "@/components/GoBack";
import Error from "@/components/live/Error";
import Heading from "@/components/live/Heading";
import NewsCard from "@/components/live/News/NewsCard";
import LiveLayout from "@/components/live/LiveLayout";
import Loading from "@/components/live/Loading";
import { GetLeagueNews } from "@/functions/api";
import { ThemeContext } from "@/pages/_app";
import React, { useContext, useEffect, useState } from "react";
import { NewsRedirectType } from "@/types";

const News = () => {
  const { mode } = useContext(ThemeContext);
  //PL STATES
  const [englishNews, setenglishNews] = useState<any>();
  const [englishError, setenglishError] = useState<any>();
  const [englishLoading, setenglishLoading] = useState<boolean>(false);

  //LA LIGA STATES
  const [laligaNews, setlaligaNews] = useState<any>();
  const [laligaError, setlaligaError] = useState<any>();
  const [laligaLoading, setlaligaLoading] = useState<boolean>(false);

  //Bundesliga News
  const [bundesligaNews, setbundesligaNews] = useState<any>();
  const [bundesligaError, setbundesligaError] = useState<any>();
  const [bundesligaLoading, setbundesligaLoading] = useState<boolean>(false);

  //SERIE A STATES
  const [serieNews, setserieNews] = useState<any>();
  const [serieError, setserieError] = useState<any>();
  const [serieLoading, setserieLoading] = useState<boolean>(false);

  //LIGUE 1 STATES
  const [ligueNews, setligueNews] = useState<any>();
  const [ligueError, setligueError] = useState<any>();
  const [ligueLoading, setligueLoading] = useState<any>();

  // PORTUGAL LEAGUE
  const [portugalNews, setportugalNews] = useState<any>();
  const [portugalError, setportugalError] = useState<any>();
  const [portugalLoading, setportugalLoading] = useState<boolean>(false);

  //RUSSIA LEAGUE
  const [russiaNews, setrussiaNews] = useState<any>();
  const [rusiaError, setrusiaError] = useState<any>();
  const [russiaLoading, setrussiaLoading] = useState<boolean>(false);

  const leagues = [
    {
      league: "eng",
      league_value: englishNews,
      league_data: setenglishNews,
      league_error: setenglishError,
      league_loading: setenglishLoading,
    },
    {
      league: "esp",
      league_value: laligaNews,
      league_data: setlaligaNews,
      league_error: setlaligaError,
      league_loading: setlaligaLoading,
    },
    {
      league: "ger",
      league_value: bundesligaNews,
      league_data: setbundesligaNews,
      league_error: setbundesligaError,
      league_loading: setbundesligaLoading,
    },
    {
      league: "ita",
      league_value: serieNews,
      league_data: setserieNews,
      league_error: setserieError,
      league_loading: setserieLoading,
    },
    {
      league: "fra",
      league_value: ligueNews,
      league_data: setligueNews,
      league_error: setligueError,
      league_loading: setligueLoading,
    },
    {
      league: "por",
      league_value: portugalNews,
      league_data: setportugalNews,
      league_error: setportugalError,
      league_loading: setportugalLoading,
    },
    {
      league: "rus",
      league_value: russiaNews,
      league_data: setrussiaNews,
      league_error: setrusiaError,
      league_loading: setrussiaLoading,
    },
  ];

  useEffect(() => {
    if (
      englishNews == undefined ||
      laligaNews == undefined ||
      bundesligaNews == undefined
    ) {
      leagues.map((league: any) => {
        GetLeagueNews(
          league.league,
          league.league_data,
          league.league_error,
          league.league_loading
        );
      });
    } else {
      console.log(englishNews);
    }
  }, [englishNews, laligaNews, bundesligaNews]);

  if (
    englishNews &&
    laligaNews &&
    bundesligaNews &&
    serieNews &&
    portugalNews &&
    ligueNews &&
    russiaNews
  ) {
    return (
      <LiveLayout>
        <main
          className={`w-full min-h-screen sm:p-12 px-6 py-12  ${
            mode == "dark" && "bg-[#111]"
          } flex flex-col gap-8 relative`}
        >
          <GoBack />
          {leagues.map((news: any) => {
            return (
              <section className="space-y-2" key={news.league_value.header}>
                <div className="flex flex-wrap items-center gap-2">
                  <Heading heading={news.league_value.header} />
                  <div className="w-full">
                    {" "}
                    {news.league_value.articles.map((article: any) => {
                      console.log(article);
                      var d = new Date(article.published);

                      const articleDate =
                        d.getDate() +
                        "/" +
                        d.getMonth() +
                        "/" +
                        d.getFullYear();
                      const newsRedirect: NewsRedirectType = {
                        path: "/live/news/singlenews",
                        newsData: {
                          image:
                            article.images?.length > 0 && article.images[0].url,
                          headline: article.headline,
                          description: article.description,
                          link: article?.links?.web?.href,
                          datePublished: articleDate,
                          category: "sport",
                        },
                      };
                      return (
                        <NewsCard
                          headline={article.headline}
                          date={articleDate}
                          action={newsRedirect}
                          image={
                            article.images.length > 0 && article.images[0].url
                          }
                        />
                      );
                    })}
                  </div>
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

export default News;
