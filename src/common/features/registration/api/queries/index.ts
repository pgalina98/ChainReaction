import axios from "@utils/api";

import User from "@models/user/user.model";

export const registerUser = ({ fullname, username, email, password }: User) => {
  return async () =>
    await axios.post<void>("/users", { fullname, username, email, password });
};
