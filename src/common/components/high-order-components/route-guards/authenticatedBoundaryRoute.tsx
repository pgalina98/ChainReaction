import { useRouter } from "next/router";

import { isUndefined } from "@utils/common";
import { getValueByKey } from "@utils/local-storage";

import { LocalStorageKeys } from "@enums/local-storage-keys";

const authenticatedBoundaryRoute = (Component: any) => {
  const AuthenticatedBoundaryRoute = (): any => {
    const router = useRouter();

    if (!isUndefined(typeof window)) {
      const isAuthenitcated = getValueByKey(
        LocalStorageKeys.AUTHENTICATION_TOKEN
      );

      if (!isAuthenitcated) {
        router.push("/login");
      }
    }

    return <Component />;
  };

  return AuthenticatedBoundaryRoute;
};

export default authenticatedBoundaryRoute;
