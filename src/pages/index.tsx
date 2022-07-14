import React from "react";

import type { NextPage } from "next";

import { Header } from "@components";

import authenticatedBoundaryRoute from "@components/hoc/route-guards/authenticatedBoundaryRoute";

import styles from "./index.module.scss";

const Home: NextPage = () => {
  return (
    <div className="h-full">
      <Header animated backgroundColor="split" />
      <div className="grid grid-cols-2 text-white">
        <div className={`${styles.h_full} bg_primary`}>asd</div>
        <div className="bg_brown">asdasd</div>
      </div>
    </div>
  );
};

export default authenticatedBoundaryRoute(Home);
