import React from "react";
import LiveLayout from "../LiveLayout";

const ViewAll = ({ action }: any) => {
  return (
    <LiveLayout>
      <div className={`text-gray-500 cursor-pointer`} onClick={action}>
        View All
      </div>
    </LiveLayout>
  );
};

export default ViewAll;
