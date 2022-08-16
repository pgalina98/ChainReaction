import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import Product from "@models/product/product.model";

import { addItemToCart } from "@utils/cart";

interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  idUser: number;
}

const initialState: CartState = { items: [], idUser: null! };

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      state = { ...Object.assign(state, { ...action.payload }) };
      addItemToCart(action.payload);
    },
    setItems: (state, action: PayloadAction<CartState>) => {
      state = { ...Object.assign(state, { ...action.payload }) };
    },
  },
});

export const { addItem, setItems } = cartSlice.actions;
export default cartSlice.reducer;
