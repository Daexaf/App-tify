import { createSlice } from "@reduxjs/toolkit";

export const TokenSlice = createSlice({
  name: "token",
  initialState: {
    token: null,
    isLogin: false,
    user: {},
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isLogin = true;
      state.user = action.payload.user;
    },
  },
});

export const { setToken } = TokenSlice.actions;

export default TokenSlice.reducer;
