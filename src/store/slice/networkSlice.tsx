import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Networks } from "../networks";
import { Moralis } from 'moralis';

export interface NetworkState {
  value: any;
}

const initialState: NetworkState = {
  value: Networks.ETH,
};

export const networkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(setNetwork.fulfilled, (state, action) => {
      if (action == null || action.payload == null) return;
      state.value = action.payload;
    });
  },
});

export const setNetwork = createAsyncThunk("setNetwork", async (payload: any) => {
  try {
    const user = Moralis.User.current();
    if (user == null) {
      await Moralis.authenticate();
    } else {
      if (!Moralis.isWeb3Enabled) {
        try { await Moralis.enableWeb3(); } catch (e) { }
      }
    }

    // User doesnt have network config yet, so add a new one
    try { await addNetwork(payload); } catch (e) { }
    try { await Moralis.switchNetwork(payload.chainId); } catch (e) { }

    return payload;
  } catch (error) {
    // User cancelled
    console.log(error);
    return null;
  }
});

async function addNetwork(payload: any) {
  await Moralis.addNetwork(
    payload.chainId,
    payload.name,
    payload.symbol,
    payload.symbol,
    payload.rpcUrl,
    payload.blockExplorer,
  );
}


export const { } = networkSlice.actions;

export default networkSlice.reducer;
