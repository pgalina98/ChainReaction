import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import User, { createEmptyUserObjectWithoutPassword } from "@models/user.model";

import { Authority } from "@enums/authority";

import { clearAuthenticationToken } from "@utils/local-storage";
import { stat } from "fs/promises";

export interface AuthenticationState extends User {
  authority: Authority;
  isAuthenticated?: boolean;
}

const initialState: AuthenticationState = {
  ...createEmptyUserObjectWithoutPassword(),
  authority: Authority.ANONYMOUS,
  isAuthenticated: false,
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthenticationState>) => {
      state = {
        ...Object.assign(state, { ...action.payload, isAuthenticated: true }),
      };
    },
    logout: (state) => {
      clearAuthenticationToken();
      state = initialState;
    },
  },
});

export const { login, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
