import { configureStore } from "@reduxjs/toolkit";

import authenticationReducer from "@features/authentication/authentication-slice";
import cartReducer from "@features/cart/cart-slice";

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
