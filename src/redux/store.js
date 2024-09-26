import { configureStore } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { eventsReducer } from "./eventsSlice";

const eventsPersistConfig = {
  key: "events",
  storage,
  whitelist: ["events"],
};

const persistedEventsReducer = persistReducer(
  eventsPersistConfig,
  eventsReducer
);

export const store = configureStore({
  reducer: {
    eventsSlice: persistedEventsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
