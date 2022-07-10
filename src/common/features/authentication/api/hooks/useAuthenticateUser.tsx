import { useMutation, UseMutationResult } from "react-query";

import User from "@models/user.model";

import { authenticateUser } from "../queries/index";

import { AUTHENTICATE_USER } from "../queries/constants";

const useAuthenticateUser = (user: User): any => {
  return useMutation(AUTHENTICATE_USER, authenticateUser(user));
};

export default useAuthenticateUser;
