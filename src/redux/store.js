import { configureStore } from "@reduxjs/toolkit";
import clientSlice from "./clientSlice";
import productSlice from "./productSlice";
import supplierSlice from "./supplierSlice";

export const store =  configureStore({
    reducer: {
      clients: clientSlice,
      products:productSlice,
      suppliers:supplierSlice
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
   