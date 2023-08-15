import { configureStore } from "@reduxjs/toolkit";
import clientSlice from "./clientSlice";
import supplierSlice from "./supplierSlice";

export const store =  configureStore({
    reducer: {
      clients: clientSlice,
      suppliers:supplierSlice
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
   