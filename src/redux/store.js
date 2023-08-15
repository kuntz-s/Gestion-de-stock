import { configureStore } from "@reduxjs/toolkit";
import clientSlice from "./clientSlice";

export const store =  configureStore({
    reducer: {
      clients: clientSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
   