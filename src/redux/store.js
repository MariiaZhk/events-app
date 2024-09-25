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

// const globalPersistConfig = {
//   key: "global",
//   storage,
//   whitelist: [],
// };

const persistedEventsReducer = persistReducer(
  eventsPersistConfig,
  eventsReducer
);

// const persistedGlobalReducer = persistReducer(globalReducer);

export const store = configureStore({
  reducer: {
    eventsSlice: persistedEventsReducer,
    //   globalSlice: persistedGlobalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
