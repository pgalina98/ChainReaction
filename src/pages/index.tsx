import React from "react";

import type { NextPage } from "next";

import { Header } from "@components";

import { RootState } from "@store/index";

import authenticatedBoundaryRoute from "@components/hoc/route-guards/authenticatedBoundaryRoute";

const Home: NextPage = () => {
  return (
    <>
      <Header animated />
    </>
  );
};

export default authenticatedBoundaryRoute(Home);
