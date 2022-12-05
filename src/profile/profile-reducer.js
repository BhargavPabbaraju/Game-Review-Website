import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import {
  CheckIsLoggedIn,
  createUserThunk,
  followUserThunk,
  loginUserThunk,
  updateUserThunk,
  unFollowUserThunk,
} from "../services/user-thunks";
// firstName:"Roronoa",
//     lastName:"Zoro",
//     bannerPicture:"https://pbs.twimg.com/profile_banners/1356621333250138118/1666110824/1500x500",
//     profilePicture:"https://pbs.twimg.com/profile_images/1589592333208924161/v0rPPnAA_400x400.jpg",
//     location:"I'm lost",
//     dateOfBirth:"2001-11-11",
//     dateJoined:"1999-10-11",
//     followingCount:123,
//     followersCount:234,
//     email:"roronoa-zoro@onepiece.com",
//     phone:"+91 1234567890",
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

  extraReducers: {
    [loginUserThunk.fulfilled]: (state, { payload }) => {
      if (payload) {
        state.profile = {
          ...payload.data.userObject,
          token: payload.data.token,
          isLoggedIn: true,
        };
        console.log("state", state.profile);
      } else {
        alert("Error logging in.Please check the credentials");
      }
    },
    [CheckIsLoggedIn.fulfilled]: (state, { payload }) => {
      console.log("payload", payload);
      if (payload) {
        state.profile = {
          ...payload.data.userObject,
          token: localStorage.getItem("WebDevToken"),
          isLoggedIn: true,
        };
        console.log("state", state.profile);
      }
    },
    [updateUserThunk.fulfilled]: (state, { payload }) => {
      if (payload) {
        state.profile = {
          ...payload,
        };
        console.log("updatedstate", state.profile);
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
  },
});
export const { updateProfile, logoutUser } = profileSlice.actions;
export default profileSlice.reducer;
