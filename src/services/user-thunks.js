import {createAsyncThunk}
  from "@reduxjs/toolkit"
import * as service
  from "./user-service"


export const loginUserThunk = createAsyncThunk(
    'App/loginuser',
    async (userrequest) =>{
       return await service.loginUser(userrequest);
    }
)

export const CheckIsLoggedIn =
    createAsyncThunk(
        'checkloggedIn',
        async () => {
           return  await service.isLoggedIn();}
    )


export const updateUserThunk =
    createAsyncThunk(
        'tuits/updateTuit',
        async (user) =>{
          return  await service.updateUser(user)}
    )


