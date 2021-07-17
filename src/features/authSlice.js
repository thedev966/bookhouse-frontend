import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isOpenedAuthModal: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state, action) => {
      state.user = null;
    },
    openModal: (state, action) => {
      state.isOpenedAuthModal = true;
    },
    closeModal: (state, action) => {
      state.isOpenedAuthModal = false;
    },
  },
});

export const { loginUser, logoutUser, openModal, closeModal } =
  authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsOpenedAuthModal = (state) => state.auth.isOpenedAuthModal;

export default authSlice.reducer;
