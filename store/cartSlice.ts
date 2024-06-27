import { WelcomeDatum } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Payload = {
  id?: number;
  val?: string | number;
  key?: string | number;
  selectedSize?: string;
  oneQuantityPrice?: number;
  quantity?: number;
};

export type CartItemType = WelcomeDatum & {
  id: number;
  quantity: number;
  selectedSize?: string;
  oneQuantityPrice?: number;
};

export type State = {
  cartItems: CartItemType[];
};

const initialState: State = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Payload>) => {
      const item = state.cartItems.find((p) => p.id === action.payload.id);

      if (item) {
        item.quantity++;
        item.attributes.price = item.oneQuantityPrice! * item.quantity;
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        } as CartItemType);
      }
    },
    updateCart: (state, action: PayloadAction<Payload>) => {
      state.cartItems = state.cartItems.map((p) => {
        if (p.id === action.payload.id) {
          if (
            action.payload.key === "quantity" &&
            typeof action.payload.val === "number"
          ) {
            p.attributes.price = p.oneQuantityPrice
              ? p.oneQuantityPrice * action.payload.val
              : p.attributes.price;
          }
          if (action.payload.key) {
            return { ...p, [action.payload.key]: action.payload.val };
          }
        }
        return p;
      });
    },
    removeFromCart: (state, action: PayloadAction<Payload>) => {
      state.cartItems = state.cartItems.filter(
        (p) => p.id !== action.payload.id
      );
    },
    resetCart: (state) => {
      state.cartItems = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, updateCart, removeFromCart, resetCart } =
  cartSlice.actions;

export default cartSlice.reducer;
