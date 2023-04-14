import { useRouter } from "next/router";
import React from "react";

const Player = () => {
  const router = useRouter();
  console.log(router.query);
  console.log(JSON.parse(router.query.links));
  return <div></div>;
};

export default Player;
