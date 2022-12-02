import React from "react";
import {createSlice} from "@reduxjs/toolkit";
const detail = {
  _id:345,
  image:"https://media.rawg.io/media/games/5ab/5abb8e4af55eb8c867410c3a740355b9.jpg",
  title:"Pokémon Scarlet and Violet",
  genres:["RPG","Platformer","Adventure","Isometric","Horror",
    "Nintendo Switch",],
  desc:'<p>The Pokémon Scarlet and Pokémon Violet games, the newest chapters in the Pokémon series, are coming to Nintendo Switch later this year. With these new titles, the Pokémon series takes a new evolutionary step, allowing you to explore freely in a richly expressed open world.</p>',

  stores:[
    "nintendo.com","amazon.com"
  ],
}
const detailSlice=createSlice({
  name:'detail',
  initialState:detail,
  reducers: {
    updateDetail(state, action) {
      return action.payload
    }
  }
})
export const {updateDetail} = detailSlice.actions;
export default detailSlice.reducer;