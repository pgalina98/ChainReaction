import React from "react";

import Head from "next/head";
import type { AppProps } from "next/app";

import { AnimatePresence } from "framer-motion";

import { QueryClient, QueryClientProvider } from "react-query";

import "common/styles/globals.scss";

const queryClient = new QueryClient();

function App({ Component, pageProps, router }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <title>ChainReaction</title>
      </Head>

      <QueryClientProvider client={queryClient}>
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={router.pathname} />
        </AnimatePresence>
      </QueryClientProvider>
    </React.Fragment>
  );
}

export default App;
