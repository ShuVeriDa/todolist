import {Dispatch} from "redux";
import {authAPI} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setIsLoggedInAC} from "../Login/authReducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppInitialStateType = {
   // происходит ли сейчас взаимодействие с сервером
   status: RequestStatusType
   // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
   error: string | null
   isInitialized: boolean
}

//THUNK
export const initializeAppTC = createAsyncThunk('app/initializeApp', async (param, thunkAPI) => {
   const res = await authAPI.me()
   if (res.data.resultCode === 0) {
      thunkAPI.dispatch(setIsLoggedInAC({value: true}))
   } else {
      handleServerAppError(res.data, thunkAPI.dispatch)
   }
   return
})

const slice = createSlice({
   name: 'app',
   initialState: {
      status: 'idle',
      error: null,
      isInitialized: false,
   } as AppInitialStateType,
   reducers: {
      setAppStatusAC: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
         state.status = action.payload.status
      },
      setAppErrorAC: (state, action: PayloadAction<{ error: string | null }>) => {
         state.error = action.payload.error
      },
   },
   extraReducers: builder => {
      builder.addCase(initializeAppTC.fulfilled, (state, action) => {
         state.isInitialized = true
      })
   }
})

//Reducer
export const applicationReducer = slice.reducer

//AC
export const {setAppStatusAC, setAppErrorAC} = slice.actions

