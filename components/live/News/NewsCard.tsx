import { backupImage } from "@/helpers/utils/urls";
import { ThemeContext } from "@/pages/_app";
import { NewsCardType } from "@/types";
import { url } from "inspector";
import { useRouter } from "next/router";
import React, { useContext } from "react";

const NewsCard = (News: NewsCardType) => {
  const { mode } = useContext(ThemeContext);
  const router = useRouter();
  console.log(News.action);
  return (
    <main
      className={`${
        mode == "dark" ? "bg-gray-800" : "bg-gray-200"
      } h-20 p-2 rounded-md my-2 gap-2 flex cursor-pointer`}
      onClick={() =>
        router.push({ pathname: News.action.path, query: News.action.newsData })
      }
    >
      <section className="w-[20%] md:w-[10%] rounded-sm  h-full">
        <img
          src={News.image ? News.image : backupImage}
          alt=""
          className="h-full object-cover w-full rounded-md"
        />
      </section>
      <section className="flex flex-col justify-around overflow-hidden gap-0 w-[80%] md:w-[90%] h-full">
        <div
          className={`${
            mode == "light" ? "text-gray-800" : "text-gray-200"
          } font-semibold text-lg text-ellipsis overflow-hidden w-full max-sm:text-base flex `}
        >
          {News.headline}
        </div>
        <div className={`text-sm font-medium text-gray-500`}>{News.date}</div>
      </section>
    </main>
  );
};

export default NewsCard;
