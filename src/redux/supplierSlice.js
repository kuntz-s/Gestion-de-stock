import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { listSuppliers, newSupplier,modifySupplier,removeSupplier } from "../utils/ApiRoute";

export const getSuppliersList = createAsyncThunk("data/getSuppliers", async () => {
  try {
    const suppliersData = await axios.get(listSuppliers);
    return suppliersData.data;
  } catch (error) {
    console.error("supplier error is ", error);
  }
});

export const addNewSupplier = createAsyncThunk("data/addSupplier", async (data) => {
  try {
    const suppliersData = await axios.post(newSupplier,data);
    console.log("res is ", suppliersData)
    return suppliersData.data;
  } catch (error) {
    console.error("new supplier error is ", error);
    return error;
  }
});

export const updateSupplier = createAsyncThunk("data/updateSupplier", async (data) => {
  try {
    const suppliersData = await axios.put(modifySupplier+data._id,data);
    console.log("updated res is ", suppliersData)
    return suppliersData.data;
  } catch (error) {
    console.error("new supplier error is ", error);
    return error;
  }
});

export const deleteSupplier = createAsyncThunk("data/removeSupplier", async (id) => {
  try {
    const suppliersData = await axios.delete(removeSupplier+id);
    return suppliersData.data;
  } catch (error) {
    console.error("delete supplier error is ", error);
    return error;
  }
});
export const supplierSlice = createSlice({
  name: "suppliers",
  initialState: {
    suppliers: [],
    suppliersStatus: null,
    newSupplierStatus:null,
    updateSupplierStatus:null,
    deleteSupplierStatus:null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSuppliersList.pending, (state, action) => {
        state.suppliersStatus = "loading";
      })
      .addCase(getSuppliersList.fulfilled, (state, action) => {
        state.suppliersStatus = "success";
        state.suppliers = action.payload;
      })
      .addCase(getSuppliersList.rejected, (state, action) => {
        state.suppliersStatus = "failed";
      })
      .addCase(addNewSupplier.pending, (state, action) => {
        state.newSupplierStatus = "loading";
      })
      .addCase(addNewSupplier.fulfilled, (state, action) => {
        state.newSupplierStatus = "success";
      })
      .addCase(addNewSupplier.rejected, (state, action) => {
        state.newSupplierStatus = "failed";
      })
      .addCase(updateSupplier.pending, (state, action) => {
        state.updateSupplierStatus = "loading";
      })
      .addCase(updateSupplier.fulfilled, (state, action) => {
        state.updateSupplierStatus = "success";
      })
      .addCase(updateSupplier.rejected, (state, action) => {
        state.updateSupplierStatus = "failed";
      })
      .addCase(deleteSupplier.pending, (state, action) => {
        state.deleteSupplierStatus = "loading";
      })
      .addCase(deleteSupplier.fulfilled, (state, action) => {
        state.deleteSupplierStatus = "success";
      })
      .addCase(deleteSupplier.rejected, (state, action) => {
        state.deleteSupplierStatus = "failed";
      })
  },
  reducers: {
    resetSupplierStatus: (state, action) => {
      state.newSupplierStatus = null;
      state.updateSupplierStatus = null;
      state.deleteSupplierStatus = null;
    },
  },
});

export const { resetSupplierStatus } = supplierSlice.actions;
export default supplierSlice.reducer;
