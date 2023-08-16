import { configureStore } from "@reduxjs/toolkit";
import clientSlice from "./clientSlice";
import productSlice from "./productSlice";
import supplierSlice from "./supplierSlice";
import commandSlice from "./commandSlice"

export const store =  configureStore({
    reducer: {
      clients: clientSlice,
      products:productSlice,
      suppliers:supplierSlice,
      commands:commandSlice
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
   