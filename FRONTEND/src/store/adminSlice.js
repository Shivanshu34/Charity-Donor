// store/adminSlice.js
import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    currentAdmin: null,
    token: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.currentAdmin = action.payload;
      state.token = action.payload.token;
    },
    logoutAdmin: (state) => {
      state.currentAdmin = null; 
      state.token = null;
    },
  },
});

export const { loginSuccess, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
