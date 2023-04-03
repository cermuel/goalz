import Heading from "@/components/live/Heading";
import LiveLayout from "@/components/live/LiveLayout";
import { ThemeContext } from "@/pages/_app";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import Loading from "@/components/live/Loading";
import GoBack from "@/components/GoBack";
import { GiSoccerBall } from "react-icons/gi";
import { TbRectangleVerticalFilled } from "react-icons/tb";

const Match = ({ query }) => {
  const router = useRouter();
  const data = router.query;
  console.log(data);
  const match = data.match && JSON.parse(data.match);
  const events = data.event && JSON.parse(data.event);
  events?.shift();
  console.log(match);

  const { mode } = useContext(ThemeContext);
  const homeForm = match?.homeTeamForm?.split("");
  const awayForm = match?.awayTeamForm?.split("");
  if (match && events) {
    return (
      <LiveLayout>
        <main
          className={`w-full min-h-screen sm:p-12 px-6 py-12  ${
            mode == "dark" && "bg-[#111]"
          } items-center flex flex-col relative`}
        >
          <GoBack />
          <div className="w-full rounded-md h-60 bg-pry-color flex justify-center mb-6">
            <div className="md:w-[60%] flex justify-around items-center w-full relative">
              <div
                className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ${
                  mode == "dark" ? "text-[#252525]" : "text-white"
                } text-2xl font-semibold`}
              >
                {match?.status !== "FT"
                  ? match.status
                  : `${match.homeTeamGoals} : ${match.awayTeamGoals}`}
              </div>
              <section>
                <div>
                  <Image
                    src={match?.homeTeamImageUrl}
                    alt="Team"
                    width={60}
                    height={60}
                    priority={true}
                  />
                  <p
                    className={`text-sm font-semibold text-white text-center `}
                  >
                    {match.homeTeamName}
                  </p>
                </div>
              </section>
              <section>
                <div>
                  <Image
                    src={match?.awayTeamImageUrl}
                    alt="Team"
                    width={60}
                    height={60}
                    priority={true}
                  />{" "}
                  <p className={`text-sm font-semibold text-white text-center`}>
                    {match.awayTeamName}
                  </p>
                </div>
              </section>
              <div
                className={`absolute bottom-4 left-[50%] translate-x-[-50%] ${
                  mode == "dark" ? "text-[#252525]" : "text-white"
                } text-base font-semibold`}
              >
                {match.venue}
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
          {match.headline && (
            <>
              <Heading heading={"Headline"} />
              <p className="text-gray-500 mb-6">{match.headline}</p>
            </>
          )}

          {match.homeTeamOdds && (
            <>
              <Heading heading="Odds" />
              <section className="flex md:w-[60%] w-full gap-2 pb-8 justify-around">
                <div
                  className={`rounded-md font-bold w-40 flex justify-between p-2 ${
                    mode == "dark"
                      ? "bg-gray-700 text-gray-300"
                      : "text-gray-700 bg-gray-300"
                  } `}
                >
                  <span>1</span>
                  {match?.homeTeamOdds}
                </div>
                <div
                  className={`rounded-md font-bold w-40 flex justify-between p-2 ${
                    mode == "dark"
                      ? "bg-gray-700 text-gray-300"
                      : "text-gray-700 bg-gray-300"
                  } `}
                >
                  <span>X</span>
                  {match?.drawOdds}
                </div>{" "}
                <div
                  className={`rounded-md font-bold w-40 flex justify-between p-2 ${
                    mode == "dark"
                      ? "bg-gray-700 text-gray-300"
                      : "text-gray-700 bg-gray-300"
                  } `}
                >
                  <span>2</span>
                  {match?.awayTeamOdds}
                </div>{" "}
              </section>
            </>
          )}
          <Heading heading="Match Events" />
          <section className="w-full border-[1px] border-gray-500 ">
            {events?.length > 0 ? (
              events.map((event) => {
                return (
                  <div
                    className={`border-b-[1px] w-full border-gray-500 p-2 flex justify-center relative items-center ${
                      event.homeTeam && "border-r-[10px] border-r-pry-color"
                    } `}
                  >
                    <span
                      className={`text-xs absolute left-2 ${
                        mode == "dark" ? "text-white" : "text-[#111"
                      }`}
                    >
                      {event.time}
                    </span>
                    <span
                      className={` ${
                        mode == "dark" ? "text-white" : "text-[#111"
                      } flex items-center font-semibold text-sm gap-2`}
                    >
                      {`${event.athlete}`}
                      {event.eventType && event.eventType.includes("Goal") ? (
                        <GiSoccerBall />
                      ) : event.eventType.includes("Yellow") ? (
                        <TbRectangleVerticalFilled className="text-[#FFCE00]" />
                      ) : event.eventType.includes("Red") ? (
                        <TbRectangleVerticalFilled className="text-[#DF2357]" />
                      ) : event.eventType.includes("Penalty") ? (
                        <p className="flex flex-col items-center">
                          <span className="text-[8px] font-semibold leading-tight">
                            PEN
                          </span>
                          <Image
                            src="/pen.svg"
                            alt="Penalty"
                            width={12}
                            height={12}
                          />
                        </p>
                      ) : null}
                    </span>
                  </div>
                );
              })
            ) : (
              <div
                className={`font-semibold text-center text-lg my-4 ${
                  mode == "light" ? "text-[#111]" : "text-white"
                }`}
              >
                Match events not available yet!!!
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

export default Match;
