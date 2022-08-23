import {authAPI} from "../../api/todolists-api";
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FieldErrorType, LoginParamsType} from "../../api/types";
import {appActions} from "../CommonActions/App";

const {setAppStatusAC} = appActions

// thunks
export const loginTC = createAsyncThunk<undefined, LoginParamsType,
   { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }>('auth/login', async (param, thunkAPI) => {
   thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
   try {
      const res = await authAPI.login(param)
      if (res.data.resultCode === 0) {
         thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
         return
      } else {
         return handleAsyncServerAppError(res.data, thunkAPI)
      }
   } catch (error: any) {
      return handleAsyncServerNetworkError(error, thunkAPI)
   }
})

export const logoutTC = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
   thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
   try {
      const res = await authAPI.logout()
      if (res.data.resultCode === 0) {
         thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
         return
      } else {
         return handleAsyncServerAppError(res.data, thunkAPI)
      }
   } catch (error: any) {
      return handleAsyncServerNetworkError(error, thunkAPI)
   }
})

export const asyncActions = {
   loginTC,
   logoutTC
}

export const slice = createSlice({
   name: 'auth',
   initialState: {
      isLoggedIn: false
   },
   reducers: {
      setIsLoggedInAC: (state, action: PayloadAction<{ value: boolean }>) => {
         state.isLoggedIn = action.payload.value
      }
   },
   extraReducers: builder => {
      builder
         .addCase(loginTC.fulfilled, (state) => {
            state.isLoggedIn = true
         })
         .addCase(logoutTC.fulfilled, (state) => {
            state.isLoggedIn = false
         })
   }
})

export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions




