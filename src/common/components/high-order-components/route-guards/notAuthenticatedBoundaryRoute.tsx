import { useEffect } from "react";

import { connect } from "react-redux";

import { useRouter } from "next/router";

import { getValueByKey } from "@utils/local-storage";

import { LOCAL_STORAGE_KEYS } from "@enums/local-storage-keys";

import { RootState } from "@store/index";
import { isUndefined } from "@utils/common";

const notAuthenticatedBoundaryRoute = (Component: any) => {
  const NotAuthenticatedBoundaryRoute = ({ authentication }): any => {
    const router = useRouter();

    if (!isUndefined(typeof window)) {
      const isAuthenitcated = getValueByKey(LOCAL_STORAGE_KEYS.AUTHENTICATION_TOKEN);

      if (isAuthenitcated) {
        router.push("/");
      }
    }

    return !authentication?.isAuthenticated && <Component authenticationState={authentication} />;
  };

  const mapStateToProps = ({ authentication }: RootState) => ({
    authentication,
  });

  return connect(mapStateToProps)(NotAuthenticatedBoundaryRoute);
};

export default notAuthenticatedBoundaryRoute;
