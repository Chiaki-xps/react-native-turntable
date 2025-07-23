import { configureStore } from "@reduxjs/toolkit";
import { Platform } from "react-native";
import { persistReducer, persistStore } from "redux-persist";
import turntableReducer from "./turntableSlice";

function getStorage() {
  if (Platform.OS === "web") {
    try {
      const testKey = "__storage_test__";
      window.localStorage.setItem(testKey, "1");
      window.localStorage.removeItem(testKey);
      return require("redux-persist/lib/storage").default;
    } catch (e) {
      // localStorage 不可用，降级为 noop storage
      return {
        getItem: () => Promise.resolve(null),
        setItem: () => Promise.resolve(),
        removeItem: () => Promise.resolve(),
      };
    }
  } else {
    return require("@react-native-async-storage/async-storage").default;
  }
}

const persistConfig = {
  key: "turntable",
  storage: getStorage(),
};

const persistedTurntableReducer = persistReducer(
  persistConfig,
  turntableReducer
);

export const store = configureStore({
  reducer: {
    turntable: persistedTurntableReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/FLUSH",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
