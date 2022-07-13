import { useRouter } from "next/router";

import { isUndefined } from "@utils/common";
import { getValueByKey } from "@utils/local-storage";

import { LOCAL_STORAGE_KEYS } from "@enums/local-storage-keys";

const authenticatedBoundaryRoute = (Component: any) => {
  const AuthenticatedBoundaryRoute = (): any => {
    const router = useRouter();

    if (!isUndefined(typeof window)) {
      const isAuthenitcated = getValueByKey(LOCAL_STORAGE_KEYS.AUTHENTICATION_TOKEN);

      if (!isAuthenitcated) {
        router.push("/login");
      }
    }

    return <Component />;
  };

  return AuthenticatedBoundaryRoute;
};

export default authenticatedBoundaryRoute;
