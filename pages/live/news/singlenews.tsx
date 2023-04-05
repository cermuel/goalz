import GoBack from "@/components/GoBack";
import Heading from "@/components/live/Heading";
import LiveLayout from "@/components/live/LiveLayout";
import Loading from "@/components/live/Loading";
import { ThemeContext } from "@/pages/_app";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

const SingleNews = () => {
  const { mode } = useContext(ThemeContext);
  const router = useRouter();
  const news = router.query;
  const date = new Date();
  const today = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  const [isToday, setisToday] = useState(false);
  useEffect(() => {
    setisToday(today == news.datePublished);
  }, [news]);

  console.log(news);
  if (news) {
    return (
      <LiveLayout>
        <main
          className={`w-full min-h-screen sm:p-12 px-6 py-12 max-sm:py-16  ${
            mode == "dark" && "bg-[#111]"
          } items-center flex flex-col relative`}
        >
          <GoBack />
          <section className="mb-4 w-full">
            {news.image && (
              <>
                <img
                  src={`${news.image}`}
                  className="rounded-md object-contain w-full h-[360px] max-sm:hidden"
                  alt=""
                  style={{
                    backgroundImage: `url(${news.image})`,
                  }}
                />
                <img
                  src={`${news.image}`}
                  className="rounded-md object-contain w-full h-full sm:hidden"
                  alt=""
                />
              </>
            )}
          </section>

          <section className="w-full flex-wrap flex justify-start">
            <p
              className={`${
                mode == "dark" ? "text-gray-400" : "text-gray-600"
              } w-full text-sm pb-2 `}
            >
              {isToday ? "Today, " + news.datePublished : news.datePublished}
            </p>
            <Heading heading={news.headline} />
            <h2
              className={`${
                mode == "dark" ? "text-gray-400" : "text-gray-600"
              } w-full text-lg mt-2 `}
            >
              {news.description}
            </h2>
            <a
              href={`${news.link}`}
              className="text-pry-color underline"
              target={"_blank"}
            >
              Read more
            </a>
          </section>
        </main>
      </LiveLayout>
    );
  } else {
    return <Loading />;
  }
};

export default SingleNews;
