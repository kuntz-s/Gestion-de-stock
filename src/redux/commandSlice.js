import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { listCommands, newCommand,modifyCommand,removeCommand } from "../utils/ApiRoute";

export const getCommandsList = createAsyncThunk("data/getCommands", async () => {
  try {
    const commandsData = await axios.get(listCommands);
    return commandsData.data;
  } catch (error) {
    return error;
  }
});

export const addNewCommand = createAsyncThunk("data/addCommand", async (data) => {
  console.log("data is ",data)
  try {
    const commandsData = await axios.post(newCommand,data);
    console.log("res is ", commandsData)
    return commandsData.data;
  } catch (error) {
    return error;
  }
});

export const updateCommand = createAsyncThunk("data/updateCommand", async (data) => {
  try {
    const commandsData = await axios.put(modifyCommand+data._id,data);
    console.log("updated res is ", commandsData)
    return commandsData.data;
  } catch (error) {
    return error;
  }
});

export const deleteCommand = createAsyncThunk("data/removeCommand", async (id) => {
  try {
    const commandsData = await axios.delete(removeCommand+id);
    return commandsData.data;
  } catch (error) {
    return error;
  }
});
export const commandSlice = createSlice({
  name: "commands",
  initialState: {
    //commandes
    commands: [],
    commandsStatus: null,
    newCommandStatus:null,
    updateCommandStatus:null,
    deleteCommandStatus:null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCommandsList.pending, (state, action) => {
        state.commandsStatus = "loading";
      })
      .addCase(getCommandsList.fulfilled, (state, action) => {
        state.commandsStatus = "success";
        state.commands = action.payload;
      })
      .addCase(getCommandsList.rejected, (state, action) => {
        state.commandsStatus = "failed";
      })
      .addCase(addNewCommand.pending, (state, action) => {
        state.newCommandStatus = "loading";
      })
      .addCase(addNewCommand.fulfilled, (state, action) => {
        state.newCommandStatus = "success";
      })
      .addCase(addNewCommand.rejected, (state, action) => {
        alert("ici")
        state.newCommandStatus = "failed";
      })
      .addCase(updateCommand.pending, (state, action) => {
        state.updateCommandStatus = "loading";
      })
      .addCase(updateCommand.fulfilled, (state, action) => {
        state.updateCommandStatus = "success";
      })
      .addCase(updateCommand.rejected, (state, action) => {
        state.updateCommandStatus = "failed";
      })
      .addCase(deleteCommand.pending, (state, action) => {
        state.deleteCommandStatus = "loading";
      })
      .addCase(deleteCommand.fulfilled, (state, action) => {
        state.deleteCommandStatus = "success";
      })
      .addCase(deleteCommand.rejected, (state, action) => {
        state.deleteCommandStatus = "failed";
      })
  },
  reducers: {
    resetCommandStatus: (state, action) => {
      state.newCommandStatus = null;
      state.updateCommandStatus = null;
      state.deleteCommandStatus = null;
    },
  },
});

export const { resetCommandStatus } = commandSlice.actions;
export default commandSlice.reducer;
