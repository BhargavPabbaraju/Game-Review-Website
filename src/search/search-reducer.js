import React from "react";
import {createSlice} from "@reduxjs/toolkit";

const apiKey = "f227150707ad40b08b9a626750b0564b";


const querySlice=createSlice({
                                   name:'searchQuery',
                                   initialState:{
                                       url:`https://api.rawg.io/api/games?key=${apiKey}`,
                                       query:""
                                   },
                                   reducers: {

                                       updateURL(state,action){
                                           return action.payload;
                                       }
                                   }
                               })
export const {updateURL} = querySlice.actions;
export default querySlice.reducer;