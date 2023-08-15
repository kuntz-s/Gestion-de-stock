import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { listClients, newClient,modifyClient,removeClient } from "../utils/ApiRoute";

export const getClientsList = createAsyncThunk("data/getClients", async () => {
  try {
    const clientsData = await axios.get(listClients);
    return clientsData.data;
  } catch (error) {
    console.error("clients error is ", error);
  }
});

export const addNewClient = createAsyncThunk("data/addClient", async (data) => {
  try {
    const clientsData = await axios.post(newClient,data);
    console.log("res is ", clientsData)
    return clientsData.data;
  } catch (error) {
    console.error("new client error is ", error);
    return error;
  }
});

export const updateClient = createAsyncThunk("data/updateClient", async (data) => {
  try {
    const clientsData = await axios.put(modifyClient+data._id,data);
    console.log("updated res is ", clientsData)
    return clientsData.data;
  } catch (error) {
    console.error("new client error is ", error);
    return error;
  }
});

export const deleteClient = createAsyncThunk("data/removeClient", async (id) => {
  try {
    const clientsData = await axios.delete(removeClient+id);
    return clientsData.data;
  } catch (error) {
    console.error("delete client error is ", error);
    return error;
  }
});
export const clientSlice = createSlice({
  name: "clients",
  initialState: {
    //engins
    clients: [],
    clientsStatus: null,
    newClientStatus:null,
    updateClientStatus:null,
    deleteClientStatus:null,
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
      .addCase(updateClient.pending, (state, action) => {
        state.updateClientStatus = "loading";
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        state.updateClientStatus = "success";
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.updateClientStatus = "failed";
      })
      .addCase(deleteClient.pending, (state, action) => {
        state.deleteClientStatus = "loading";
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.deleteClientStatus = "success";
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.deleteClientStatus = "failed";
      })
  },
  reducers: {
    resetClientStatus: (state, action) => {
      state.newClientStatus = null;
      state.updateClientStatus = null;
      state.deleteClientStatus = null;
    },
  },
});

export const { resetClientStatus } = clientSlice.actions;
export default clientSlice.reducer;
