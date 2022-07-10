import User, { createEmptyUserObjectWithoutPassword } from "@models/user.model";

const mapJwtClaimsToUserObject = (jwtClaims: any): User => {
  const user: User = createEmptyUserObjectWithoutPassword();

  user.id = jwtClaims["id_user"];
  user.fullname = jwtClaims["full_name"];
  user.username = jwtClaims["username"];
  user.email = jwtClaims["email_address"];

  return user;
};

export default mapJwtClaimsToUserObject;
