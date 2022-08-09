import React, { useState } from "react";

import { NextPage } from "next";

import { Filter, Header, Icon } from "@components";

const Bikes: NextPage = () => {
  const [isFilterBoxOpen, setIsFilterBoxOpen] = useState<boolean>(false);

  return (
    <div className="h-full">
      <Header animated showMenu backgroundColor="split" />
      <div className="h-screen bg_split">
        <div
          className="w-20 h-12 absolute -left-5 flex items-center justify-center p-2 bg_white rounded-full cursor-pointer"
          onClick={() => setIsFilterBoxOpen(true)}
        >
          <Icon className="ml-3 text-2xl" icon="las la-filter" />
        </div>
        <Filter isOpen={isFilterBoxOpen} toggleFilterBox={setIsFilterBoxOpen} />
      </div>
    </div>
  );
};

export default Bikes;
