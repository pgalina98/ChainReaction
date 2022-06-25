import React from "react";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import Head from "next/head";
import type { AppProps } from "next/app";

import { Header } from "common/components";

import "common/styles/globals.scss";

function App({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <title>ChainReaction</title>
        <link
          rel="stylesheet"
          href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"
        ></link>
      </Head>
      <Header />
      <Component {...pageProps} />
    </React.Fragment>
  );
}

export default App;
