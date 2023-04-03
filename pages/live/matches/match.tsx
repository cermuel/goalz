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
  const mode = useContext(ThemeContext);

  if (data) {
    return (
      <LiveLayout>
        <main
          className={`w-full min-h-screen sm:p-12 px-6 py-12  ${
            mode == "dark" && "bg-[#111]"
          }`}
        >
          <div className="w-full rounded-md h-60 bg-pry-color flex justify-center">
            <div className="md:w-[60%] flex justify-around items-center w-full relative">
              <div
                className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white text-xl font-semibold`}
              >
                {data.status}
              </div>
              <section>
                <div>
                  <Image
                    src={data?.homeTeamImageUrl as string}
                    alt="Team"
                    width={60}
                    height={60}
                    priority={true}
                  />
                  <p className={`text-sm font-semibold text-white `}>
                    {data.homeTeamName}
                  </p>
                </div>
              </section>
              <section>
                <div>
                  <Image
                    src={data?.awayTeamImageUrl as string}
                    alt="Team"
                    width={60}
                    height={60}
                    priority={true}
                  />{" "}
                  <p className={`text-sm font-semibold text-white `}>
                    {data.awayTeamName}
                  </p>
                </div>
              </section>
            </div>
          </div>
        </main>
      </LiveLayout>
    );
  }
};

export default Match;
