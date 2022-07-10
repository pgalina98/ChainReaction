import { useMutation, UseMutationResult } from "react-query";
import { AxiosResponse } from "axios";

import User from "@models/user.model";
import JwtToken from "@models/jwt-token.model";

import { authenticateUser } from "../queries";

import { AUTHENTICATE_USER } from "../queries/constants";

const useAuthenticateUser = (user: User): any => {
  return useMutation(AUTHENTICATE_USER, authenticateUser(user));
};

export default useAuthenticateUser;
