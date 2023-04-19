import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Player = () => {
  const router = useRouter();
  console.log(router.query);
  useEffect(() => {
    if (typeof router.query.links == "string") {
      console.log(JSON.parse(router.query.links));
    }
  }, []);

  return <div></div>;
};

export default Player;
