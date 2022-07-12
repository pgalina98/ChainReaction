import { useEffect } from "react";

import { connect } from "react-redux";

import { useRouter } from "next/router";

import { RootState } from "@store/index";

const authenticatedBoundaryRoute = (Component: any) => {
  const AuthenticatedBoundaryRoute = ({ authentication }): any => {
    const router = useRouter();

    useEffect(() => {
      if (!authentication?.isAuthenticated) {
        router.push("/login");
      }
    }, [authentication?.isAuthenticated, router]);

    return authentication?.isAuthenticated && <Component authentication={authentication} />;
  };

  const mapStateToProps = ({ authentication }: RootState) => ({
    authentication,
  });

  return connect(mapStateToProps)(AuthenticatedBoundaryRoute);
};

export default authenticatedBoundaryRoute;
