import { useRouter } from "next/router";

import { isUndefined } from "@utils/common";
import { getValueByKey } from "@utils/local-storage";

import { LoaclStorageKeys } from "@enums/local-storage-keys";

const authenticatedBoundaryRoute = (Component: any) => {
  const AuthenticatedBoundaryRoute = (): any => {
    const router = useRouter();

    if (!isUndefined(typeof window)) {
      const isAuthenitcated = getValueByKey(LoaclStorageKeys.AUTHENTICATION_TOKEN);

      if (!isAuthenitcated) {
        router.push("/login");
      }
    }

    return <Component />;
  };

  return AuthenticatedBoundaryRoute;
};

export default authenticatedBoundaryRoute;
