import { useMutation } from "react-query";

import User from "@models/user.model";

import { registerUser } from "../queries/index";

import { REGISTER_USER } from "../queries/constants";

const useRegisterUser = (user: User): any => {
  return useMutation(REGISTER_USER, registerUser(user));
};

export default useRegisterUser;
