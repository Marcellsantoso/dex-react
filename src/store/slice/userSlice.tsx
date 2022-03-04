import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Moralis } from "moralis";
import { useDispatch } from "react-redux";

export interface UserState {
  value: any,
  address: string;
  balance: string;
}

const initialState: UserState = {
  value: null,
  address: null,
  balance: null,
};


export const connect = createAsyncThunk("user/connect", async () => {
  const result = await Moralis.authenticate();
  return result;
});

export const getAddress = createAsyncThunk("user/address", async () => {
  const result = await Moralis.User.current().get('ethAddress');
  return result;
});

export const getBalance = createAsyncThunk("user/balance", async (data: any) => {
  const balance = await Moralis.Web3API.account.getNativeBalance({
    address: data.address,
    chain: data.chainId,
  });
  console.log(balance);


  return balance;
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
    // User
    builder.addCase(connect.fulfilled, (state, action) => {
      state.value = action.payload;
    });

    // User address
    builder.addCase(getAddress.fulfilled, (state, action) => {
      state.address = action.payload;
    });

    // User balance
    builder.addCase(getBalance.fulfilled, (state, action) => {
      state.balance = action.payload.balance;
    });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
