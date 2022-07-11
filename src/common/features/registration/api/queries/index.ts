import axios from "@utils/api";

import User from "@models/user.model";

export const registerUser = (user: User) => {
  return async () => await axios.post<void>("/users", user);
};
