import React from "react";

import Head from "next/head";
import type { AppProps } from "next/app";

import { Header } from "common/components";

import "common/styles/globals.scss";

function App({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <title>ChainReaction</title>
      </Head>

      <Header />
      <Component {...pageProps} />
    </React.Fragment>
  );
}

export default App;
