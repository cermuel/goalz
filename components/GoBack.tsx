import { useRouter } from "next/router";
import React from "react";
import { IoArrowBack } from "react-icons/io5";

const GoBack = () => {
  const router = useRouter();
  return (
    <div
      className="cursor-pointer absolute top-2 left-2"
      onClick={() => router.back()}
    >
      <IoArrowBack className="text-pry-color text-xl" />
    </div>
  );
};

export default GoBack;
