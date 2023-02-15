import { getUser } from "@/utils/token";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  initialState: {
    user: getUser(),
    status: "idle",
  },
  name: "auth",
  reducers: {
    onLogout: (state) => {
      state.user = null;
    },
    onSetUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {},
});
export default authSlice.reducer;
export const { onLogout, onSetUser } = authSlice.actions;
