import { configureStore } from "@reduxjs/toolkit";
import turntableReducer from "./turntableSlice";

export const store = configureStore({
  reducer: {
    turntable: turntableReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
