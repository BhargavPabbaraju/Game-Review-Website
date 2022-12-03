import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { apiKey } from "../services/user-service";

const querySlice = createSlice({
  name: "searchQuery",
  initialState: {
    url: `https://api.rawg.io/api/games?key=${apiKey}`,
    query: "",
  },
  reducers: {
    updateURL(state, action) {
      return action.payload;
    },
  },
});
export const { updateURL } = querySlice.actions;
export default querySlice.reducer;
