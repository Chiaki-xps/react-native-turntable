import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import turntableReducer from "./turntableSlice";

const persistConfig = {
  key: "turntable",
  storage: AsyncStorage,
};

const persistedTurntableReducer = persistReducer(
  persistConfig,
  turntableReducer
);

export const store = configureStore({
  reducer: {
    turntable: persistedTurntableReducer,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
