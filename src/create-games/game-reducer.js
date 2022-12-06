import React from "react";
import {createSlice} from "@reduxjs/toolkit";


const template_game = []

const detailSlice=createSlice({
  name: 'game',
  initialState: template_game,
  reducers: {
    createGame(state, action) {
      console.log("Payload", action.payload)
      state.unshift({
        ...action.payload,
      });
      console.log("Reducer-create", state.game)
    },
    // createGame(state, action) {
    //   console.log("Payload", action.payload)
    //   const temp = {
    //     ...template_game,
    //     ...action.payload,
    //   }
    //   return temp
    //   console.log("Reducer-create", state.game)
    // },
    deleteGame(state, action) {
      const index = action.payload;
      console.log("state12",state)
      //state.splice(index, 1)
    },
    updateGame(state, action) {
      console.log("update",state)
      const temp = {
          ...template_game,
          ...action.payload,
      }
      return temp
    }
  }
})
export const {createGame, updateGame, deleteGame} = detailSlice.actions;
export default detailSlice.reducer;