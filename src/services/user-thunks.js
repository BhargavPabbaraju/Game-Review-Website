import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "./user-service";

export const loginUserThunk = createAsyncThunk(
  "App/loginuser",
  async (userrequest) => {
    return await service.loginUser(userrequest);
  }
);

export const CheckIsLoggedIn = createAsyncThunk("checkloggedIn", async () => {
  return await service.isLoggedIn();
});

export const updateUserThunk = createAsyncThunk(
  "tuits/updateTuit",
  async (user) => {
    return await service.updateUser(user);
  }
);

export const followUserThunk = createAsyncThunk(
  "tuits/followUser",
  async (uid) => {
    return await service.followUser(uid);
  }
);
export const postReviewThunk =
    createAsyncThunk(
        'tuits/updateTuit',
        async (review) =>{
          return  await service.postReview(review)}
    )

export const unFollowUserThunk = createAsyncThunk(
  "tuits/unfollowUser",
  async (uid) => {
    return await service.unfollowUser(uid);
  }
);

export const favoriteGameThunk = createAsyncThunk(
    "tuits/favoriteGame",
    async (gid) => {
        return await service.favoriteGame(gid);
    }
);

export const unfavoriteGameThunk = createAsyncThunk(
    "tuits/unfavoriteGame",
    async (gid) => {
        return await service.unfavoriteGame(gid);
    }
);


export const updateReviewThunk =
    createAsyncThunk(
        'tuits/updateTuit',
        async (review) =>{
          return  await service.updateReview(review)}
    )

export const deleteReviewThunk =
    createAsyncThunk(
        'tuits/updateTuit',
        async (review) =>{
          return  await service.deleteReview(review)}
    )

export const updateLikesThunk =
    createAsyncThunk(
        'tuits/updateTuit',
        async (obj) =>{
          if(obj.like)
          {return  await service.increaseCount(obj)}
          await service.decreaseCount(obj)
        }
    )



