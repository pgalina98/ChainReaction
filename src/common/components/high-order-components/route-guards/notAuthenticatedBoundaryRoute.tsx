import { useRouter } from "next/router";

import { getValueByKey } from "@utils/local-storage";

import { LOCAL_STORAGE_KEYS } from "@enums/local-storage-keys";

import { isUndefined } from "@utils/common";

const notAuthenticatedBoundaryRoute = (Component: any) => {
  const NotAuthenticatedBoundaryRoute = (): any => {
    const router = useRouter();

    if (!isUndefined(typeof window)) {
      const isAuthenitcated = getValueByKey(LOCAL_STORAGE_KEYS.AUTHENTICATION_TOKEN);

      if (isAuthenitcated) {
        router.push("/");
      }
    }

    return <Component />;
  };

  return NotAuthenticatedBoundaryRoute;
};

export default notAuthenticatedBoundaryRoute;
