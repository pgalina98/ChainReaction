import React, { useEffect } from "react";

import { Provider, useDispatch } from "react-redux";

import { store } from "common/store";

import Head from "next/head";
import type { AppProps } from "next/app";

import { AnimatePresence } from "framer-motion";

import { QueryClient, QueryClientProvider } from "react-query";

import jwtDecode from "jwt-decode";

import User from "@models/user.model";

import { LOCAL_STORAGE_KEYS } from "@enums/local-storage-keys";
import { getAuthorityByKey } from "@enums/authority";

import { getValueByKey } from "@utils/local-storage";

import { login } from "@features/authentication/authentication-slice";

import mapJwtClaimsToUserObject from "@mappers/mapJwtClaimsToUserObject";

import "common/styles/globals.scss";

const queryClient = new QueryClient();

const ComponentWrapper = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!!getValueByKey(LOCAL_STORAGE_KEYS.AUTHENTICATION_TOKEN)) {
      const jwtClaims: any = jwtDecode(getValueByKey(LOCAL_STORAGE_KEYS.AUTHENTICATION_TOKEN)!);

      const user: User = mapJwtClaimsToUserObject(jwtClaims);

      dispatch(login({ ...user, authority: getAuthorityByKey(jwtClaims["authorities"]) }));
    }
  }, [dispatch]);

  return <React.Fragment>{children}</React.Fragment>;
};

function App({ Component, pageProps, router }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <title>ChainReaction</title>
      </Head>

      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AnimatePresence exitBeforeEnter>
            <ComponentWrapper>
              <Component {...pageProps} key={router.pathname} />
            </ComponentWrapper>
          </AnimatePresence>
        </QueryClientProvider>
      </Provider>
    </React.Fragment>
  );
}

export default App;
