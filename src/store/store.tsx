import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { counterSlice } from "./slice/counterSlice";
import { networkSlice } from "./slice/networkSlice";
import { userSlice } from "./slice/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    user: userSlice.reducer,
    network: networkSlice.reducer,
  },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
