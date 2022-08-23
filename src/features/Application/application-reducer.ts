import {authAPI} from "../../api/todolists-api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {appActions} from "../CommonActions/App";
import {authActions} from "../Auth";

//THUNK
const initializeAppTC = createAsyncThunk('application/initializeApp', async (param, thunkAPI) => {
   const res = await authAPI.me()
   if (res.data.resultCode === 0) {
      thunkAPI.dispatch(authActions.setIsLoggedInAC({value: true}))
   } else {

   }
})

export const asyncActions = {
   initializeAppTC
}

export const slice = createSlice({
   name: 'app',
   initialState: {
      status: 'idle',
      error: null,
      isInitialized: false
   } as AppInitialStateType,
   reducers: {},
   extraReducers: builder => {
      builder
         .addCase(initializeAppTC.fulfilled, (state, action) => {
            state.isInitialized = true
         })
         .addCase(appActions.setAppStatusAC, (state, action) => {
            state.status = action.payload.status
         })
         .addCase(appActions.setAppErrorAC, (state, action) => {
            state.error = action.payload.error
         })
   }
})


//Types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppInitialStateType = {
   // происходит ли сейчас взаимодействие с сервером
   status: RequestStatusType
   // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
   error: string | null
   isInitialized: boolean
}