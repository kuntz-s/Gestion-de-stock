import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { listClients, newClient } from "../utils/ApiRoute";

export const getClientsList = createAsyncThunk("data/getClients", async () => {
  try {
    const clientsData = await axios.get(listClients);
    return clientsData.data;
  } catch (error) {
    console.error("clients error is ", error);
  }
});

export const addNewClient = createAsyncThunk("data/addClient", async (data) => {
  console.log("enter",data)
  try {
    const clientsData = await axios.post(newClient,data);
    console.log("res is ", clientsData)
    return clientsData.data;
  } catch (error) {
    console.error("new client error is ", error);
  }
});
export const clientSlice = createSlice({
  name: "clients",
  initialState: {
    //engins
    clients: [],
    clientsStatus: null,
    newClientStatus:null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClientsList.pending, (state, action) => {
        state.clientsStatus = "loading";
      })
      .addCase(getClientsList.fulfilled, (state, action) => {
        state.clientsStatus = "success";
        state.clients = action.payload;
      })
      .addCase(getClientsList.rejected, (state, action) => {
        state.clientsStatus = "failed";
      })
      .addCase(addNewClient.pending, (state, action) => {
        state.newClientStatus = "loading";
      })
      .addCase(addNewClient.fulfilled, (state, action) => {
        state.newClientStatus = "success";
      })
      .addCase(addNewClient.rejected, (state, action) => {
        state.newClientStatus = "failed";
      })
  },
  reducers: {
    resetNewClientStatus: (state, action) => {
      state.newClientStatus = null;
    },
  },
});

export const { resetNewClientStatus } = clientSlice.actions;
export default clientSlice.reducer;
