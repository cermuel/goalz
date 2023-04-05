import React from "react";
import LiveLayout from "../LiveLayout";

const ViewAll = ({ action }: any) => {
  return (
    <div className={`text-right text-gray-500 cursor-pointer`} onClick={action}>
      View All
    </div>
  );
};

export default ViewAll;
