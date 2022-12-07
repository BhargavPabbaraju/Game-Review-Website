import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "./user-service";

export const createGameThunk = createAsyncThunk(
  "App/createGame",
  async (userrequest) => {
    return await service.creategame(userrequest);
  }
);
export const deleteGameThunk = createAsyncThunk(
  "App/daleteGame",
  async (userrequest) => {
    return await service.deletegame(userrequest);
  }
);

export const updateGameThunk = createAsyncThunk(
  "App/daleteGame",
  async (userrequest) => {
    return await service.updateGame(userrequest);
  }
);
