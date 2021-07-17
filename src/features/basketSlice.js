import { createSlice } from "@reduxjs/toolkit";
import removeFromBasket from "../basket/removeFromBasket";
import addToBasket from "../basket/addToBasket";

const initialState = {
  basket: [],
  basketCount: 0,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    LOAD_BASKET: (state, action) => {
      state.basket = action.payload;
    },
    ADD_TO_BASKET: (state, action) => {
      addToBasket(action.payload);
      state.basket = [...state.basket, action.payload];
      state.basketCount += 1;
    },
    REMOVE_FROM_BASKET: (state, action) => {
      removeFromBasket(action.payload.id);
      state.basket = state.basket.filter(
        (item) => item.id !== action.payload.id
      );
      state.basketCount -= 1;
    },
    UPDATE_BASKET_ITEM: (state, action) => {
      state.basket = [...state.basket, action.payload];
      state.basketCount += 1;
    },
    EMPTY_BASKET: (state, action) => {
      state.basket = null;
      state.basketCount = 0;
      localStorage.removeItem("basket");
    },
    SET_BASKET_COUNT: (state, action) => {
      let count = 0;
      state.basket?.forEach((b) => {
        count += b.quantity;
      });
      state.basketCount = count;
    },
  },
});

export const {
  ADD_TO_BASKET,
  REMOVE_FROM_BASKET,
  EMPTY_BASKET,
  LOAD_BASKET,
  SET_BASKET_COUNT,
} = basketSlice.actions;

export const selectBasket = (state) => state.basket.basket;
export const selectBasketCount = (state) => state.basket.basketCount;

export default basketSlice.reducer;
