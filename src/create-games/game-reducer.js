import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { createGameThunk } from "../services/create-game";

const template_game = [];

const detailSlice = createSlice({
  name: "game",
  initialState: template_game,
  reducers: {
    createGame(state, action) {
      state.unshift({
        ...action.payload,
      });
    },

    deleteGame(state, action) {
      const index = action.payload;

      //state.splice(index, 1)
    },
    updateGame(state, action) {
      const temp = {
        ...template_game,
        ...action.payload,
      };
      return temp;
    },
  },
});
export const { createGame, updateGame, deleteGame } = detailSlice.actions;
export default detailSlice.reducer;
