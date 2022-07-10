export enum Authority {
  ANONYMOUS = "ROLE_ANONYMOUS",
  USER = "ROLE_USER",
  ADMIN = "ROLE_ADMIN",
}

export const getAuthorityByKey = (key: string): Authority => {
  switch (key) {
    case "ROLE_ANONYMOUS":
      return Authority.ANONYMOUS;

    case "ROLE_USER":
      return Authority.USER;

    case "ROLE_ADMIN":
      return Authority.ADMIN;

    default:
      return Authority.ANONYMOUS;
  }
};
