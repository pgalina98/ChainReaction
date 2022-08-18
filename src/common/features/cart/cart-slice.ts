import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import Product from "@models/product/product.model";

import {
  addItemToCart,
  removeAllItemsFromCart,
  removeItemToCart,
  updateItemInCart,
} from "@utils/cart";

export interface CartItem extends Product {
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
      state = {
        ...Object.assign(state, { items: [...state.items, action.payload] }),
      };
      addItemToCart(action.payload);
    },
    removeItem: (state, action: PayloadAction<Product>) => {
      state = {
        ...Object.assign(state, {
          items: [
            ...state.items.filter(
              (item: CartItem) => item.idProduct !== action.payload.idProduct
            ),
          ],
        }),
      };
      removeItemToCart(action.payload);
    },
    updateItem: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.items.findIndex(
        (item: CartItem) => item.idProduct === action.payload.idProduct
      );

      state.items[itemIndex] = { ...action.payload };

      state = {
        ...Object.assign(state, { items: [...state.items] }),
      };
      updateItemInCart(action.payload);
    },
    clearCart: (state, action: PayloadAction<number>) => {
      state = { ...Object.assign(state, initialState) };
      removeAllItemsFromCart(action.payload);
    },
    setItems: (state, action: PayloadAction<CartState>) => {
      state = { ...Object.assign(state, { items: [...action.payload.items] }) };
    },
  },
});

export const { addItem, removeItem, updateItem, clearCart, setItems } =
  cartSlice.actions;
export default cartSlice.reducer;
