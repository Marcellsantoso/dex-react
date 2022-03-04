import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Moralis } from "moralis";

export interface UserState {
  value: any;
}

const initialState: UserState = {
  value: null,
};

export const connect = createAsyncThunk("user/connect", async () => {
  const result = await Moralis.authenticate();
  return JSON.stringify(result);
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(connect.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
