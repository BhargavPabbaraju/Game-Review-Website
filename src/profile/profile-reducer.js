import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import {
  CheckIsLoggedIn,
  deleteReviewThunk,
  postReviewThunk, updateReviewThunk,
  createUserThunk,
  followUserThunk,
  loginUserThunk,
  updateUserThunk,
  unFollowUserThunk, updateLikesThunk,
    favoriteGameThunk,unfavoriteGameThunk,
} from "../services/user-thunks";
import {
  createGameThunk,
  deleteGameThunk,
  updateGameThunk,
} from "../services/create-game";
const profile = {
  profile: {
    isLoggedIn: false,
    token: "",
  },
};
const profileSlice = createSlice({
  name: "profile",
  initialState: profile,
  reducers: {
    updateProfile(state, action) {
      state.profile = {
        ...state.profile,
        ...action.payload,
      };
    },
    logoutUser(state, action) {
      state.profile = {
        isLoggedIn: false,

        token: "",
      };
    },
  },

  extraReducers:{
    [loginUserThunk.fulfilled]:
        (state, { payload }) => {
          if(payload){
            state.profile={
              ...payload.data.userObject,
              token:payload.data.token,
              isLoggedIn: true
            }
            console.log("state",state.profile)
          }
          else{
            alert("Error logging in.Please check the credentials")
          }

        },
    [CheckIsLoggedIn.fulfilled]:
        (state, { payload }) => {
            console.log("payload",payload)
          if(payload){
            state.profile={
              ...payload.data.userObject,
              token:localStorage.getItem("WebDevToken"),
              isLoggedIn: true
            }
            console.log("state",state.profile)
          }

        },
    [updateUserThunk.fulfilled]:
        (state, { payload }) => {
          if(payload){
            state.profile={
              ...payload,
            }
            console.log("updatedstate",state.profile)
          }
        },
    [postReviewThunk.fulfilled]:
        (state, { payload }) => {
          if(payload){
            state.profile={
             ...state.profile,
              activity:payload.data.activity
            }
            console.log("postReview",state.profile)
          }
        },
    [updateReviewThunk.fulfilled]:
        (state, { payload }) => {
          if(payload){
            state.profile={
              ...state.profile,
              activity:payload.data.activity
            }
            console.log("updateReview",state.profile)
          }
        },
    [updateLikesThunk.fulfilled]:
        (state, { payload }) => {
          if(payload){
            state.profile={
              ...state.profile,
              activity:payload.data.activity
            }
            console.log("like",state.profile)
          }
        },
    [followUserThunk.fulfilled]: (state, { payload }) => {
      if (payload) {
        state.profile = {
          ...state.profile,
          following_list: payload.data.following_list,
          following_count: payload.data.following_count,
        };
      }
    },
    [unFollowUserThunk.fulfilled]: (state, { payload }) => {
      if (payload) {
        state.profile = {
          ...state.profile,
          following_list: payload.data.following_list,
          following_count: payload.data.following_count,
        };
      }
    },
    [favoriteGameThunk.fulfilled]: (state, { payload }) => {
      if (payload) {
        state.profile = {
          ...state.profile,
          favorites:payload.data.favorites,
        };
      }
    },
    [unfavoriteGameThunk.fulfilled]: (state, { payload }) => {
      if (payload) {
        state.profile = {
          ...state.profile,
          favorites:payload.data.favorites,
        };
      }
    },
    [deleteReviewThunk.fulfilled]: (state, { payload }) => {
      if (payload) {
        state.profile = {
          ...state.profile,
          activity: payload.data.activity,
        };
      }
    },
    [createGameThunk.fulfilled]: (state, { payload }) => {
      if (payload) {
        state.profile = {
          ...state.profile,
          createdGames: payload.data.createdGames,
        };
      }
    },
    [deleteGameThunk.fulfilled]: (state, { payload }) => {
      if (payload) {
        state.profile = {
          ...state.profile,
          createdGames: payload.data.createdGames,
        };
      }
    },
    [updateGameThunk.fulfilled]: (state, { payload }) => {
      if (payload) {
        state.profile = {
          ...state.profile,
          createdGames: payload.data.createdGames,
        };
      }
    },
  },
});
export const { updateProfile, logoutUser } = profileSlice.actions;
export default profileSlice.reducer;
