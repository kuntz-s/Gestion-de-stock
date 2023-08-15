import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { listProducts, newProduct,modifyProduct,removeProduct } from "../utils/ApiRoute";

export const getProductsList = createAsyncThunk("data/getProducts", async () => {
  try {
    const productsData = await axios.get(listProducts);
    return productsData.data;
  } catch (error) {
    console.error("product error is ", error);
  }
});

export const addNewProduct = createAsyncThunk("data/addProduct", async (data) => {
  try {
    const productsData = await axios.post(newProduct,data);
    console.log("res is ", productsData)
    return productsData.data;
  } catch (error) {
    console.error("new product error is ", error);
    return error;
  }
});

export const updateProduct = createAsyncThunk("data/updateProduct", async (data) => {
  try {
    const productsData = await axios.put(modifyProduct+data._id,data);
    console.log("updated res is ", productsData)
    return productsData.data;
  } catch (error) {
    console.error("new product error is ", error);
    return error;
  }
});

export const deleteProduct = createAsyncThunk("data/removeProduct", async (id) => {
  try {
    const productsData = await axios.delete(removeProduct+id);
    return productsData.data;
  } catch (error) {
    console.error("delete product error is ", error);
    return error;
  }
});
export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    productsStatus: null,
    newProductStatus:null,
    updateProductStatus:null,
    deleteProductStatus:null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsList.pending, (state, action) => {
        state.productsStatus = "loading";
      })
      .addCase(getProductsList.fulfilled, (state, action) => {
        state.productsStatus = "success";
        state.products = action.payload;
      })
      .addCase(getProductsList.rejected, (state, action) => {
        state.productsStatus = "failed";
      })
      .addCase(addNewProduct.pending, (state, action) => {
        state.newProductStatus = "loading";
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.newProductStatus = "success";
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.newProductStatus = "failed";
      })
      .addCase(updateProduct.pending, (state, action) => {
        state.updateProductStatus = "loading";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.updateProductStatus = "success";
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.updateProductStatus = "failed";
      })
      .addCase(deleteProduct.pending, (state, action) => {
        state.deleteProductStatus = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.deleteProductStatus = "success";
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleteProductStatus = "failed";
      })
  },
  reducers: {
    resetProductStatus: (state, action) => {
      state.newProductStatus = null;
      state.updateProductStatus = null;
      state.deleteProductStatus = null;
    },
  },
});

export const { resetProductStatus } = productSlice.actions;
export default productSlice.reducer;
