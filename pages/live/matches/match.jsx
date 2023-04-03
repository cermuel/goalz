import Heading from "@/components/live/Heading";
import LiveLayout from "@/components/live/LiveLayout";
import { ThemeContext } from "@/pages/_app";
import { matchData } from "@/types";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext } from "react";

const Match = () => {
  const router = useRouter();
  const data = router.query;
  console.log(data);
  const { mode } = useContext(ThemeContext);
  const homeForm = data?.homeTeamForm?.split("");
  const awayForm = data?.awayTeamForm?.split("");
  if (data) {
    return (
      <LiveLayout>
        <main
          className={`w-full min-h-screen sm:p-12 px-6 py-12  ${
            mode == "dark" && "bg-[#111]"
          } items-center flex flex-col`}
        >
          <div className="w-full rounded-md h-60 bg-pry-color flex justify-center mb-6">
            <div className="md:w-[60%] flex justify-around items-center w-full relative">
              <div
                className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ${
                  mode == "dark" ? "text-[#252525]" : "text-white"
                } text-xl font-semibold`}
              >
                {data.status}
              </div>
              <section>
                <div>
                  <Image
                    src={data?.homeTeamImageUrl}
                    alt="Team"
                    width={60}
                    height={60}
                    priority={true}
                  />
                  <p
                    className={`text-sm font-semibold text-white text-center `}
                  >
                    {data.homeTeamName}
                  </p>
                </div>
              </section>
              <section>
                <div>
                  <Image
                    src={data?.awayTeamImageUrl}
                    alt="Team"
                    width={60}
                    height={60}
                    priority={true}
                  />{" "}
                  <p className={`text-sm font-semibold text-white text-center`}>
                    {data.awayTeamName}
                  </p>
                </div>
              </section>
              <div
                className={`absolute bottom-4 left-[50%] translate-x-[-50%] ${
                  mode == "dark" ? "text-[#252525]" : "text-white"
                } text-base font-semibold`}
              >
                {data.venue}
              </div>
            </div>
          </div>
          <Heading heading="Form (Last 5 matches)" />
          <section className="flex md:w-[60%] w-full pb-6 justify-around">
            <div>
              <p className={`font-bold text-xl`}>
                {homeForm?.map((form) => (
                  <span
                    className={`ml-[1px] ${
                      form == "W"
                        ? "text-green-600"
                        : form == "L"
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  >
                    {form}
                  </span>
                ))}
              </p>
            </div>
            <div>
              {" "}
              <p className={`font-bold text-xl`}>
                {awayForm?.map((form) => (
                  <span
                    className={`ml-[1px] ${
                      form == "W"
                        ? "text-green-600"
                        : form == "L"
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  >
                    {form}
                  </span>
                ))}
              </p>
            </div>
          </section>
          <Heading heading="Odds" />
          <section className="flex md:w-[60%] w-full gap-2 pb-6 justify-around">
            <div
              className={`rounded-md font-bold w-40 flex justify-between p-2 ${
                mode == "dark"
                  ? "bg-gray-700 text-gray-300"
                  : "text-gray-700 bg-gray-300"
              } `}
            >
              <span>1</span>
              {data?.homeTeamOdds}
            </div>{" "}
            <div
              className={`rounded-md font-bold w-40 flex justify-between p-2 ${
                mode == "dark"
                  ? "bg-gray-700 text-gray-300"
                  : "text-gray-700 bg-gray-300"
              } `}
            >
              <span>X</span>
              {data?.drawOdds}
            </div>{" "}
            <div
              className={`rounded-md font-bold w-40 flex justify-between p-2 ${
                mode == "dark"
                  ? "bg-gray-700 text-gray-300"
                  : "text-gray-700 bg-gray-300"
              } `}
            >
              <span>2</span>
              {data?.awayTeamOdds}
            </div>{" "}
          </section>
        </main>
      </LiveLayout>
    );
  }
};

export default Match;
