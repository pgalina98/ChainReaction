import axios from "@utils/api";

import User from "@models/user.model";
import JwtToken from "@models/jwt-token.model";

export const authenticateUser = ({ username, password }: User) => {
  return async () => await axios.post<JwtToken>("/authentication", { username, password });
};
