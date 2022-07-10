import React from "react";

import { connect, useSelector } from "react-redux";
import { RootState } from "@store/index";

import type { NextPage } from "next";

const Home: NextPage = (props) => {
  return <></>;
};

const mapStateToProps = ({ authentication }: RootState) => ({
  authentication,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
