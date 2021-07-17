import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import basketReducer from "../features/basketSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    basket: basketReducer,
  },
});
