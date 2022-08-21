import {authAPI} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAppStatusAC} from "../Application/application-reducer";
import {FieldErrorType, LoginParamsType} from "../../api/types";
import {appActions} from "../CommonActions/App";

const {setAppStatus} = appActions

// thunks
export const loginTC = createAsyncThunk<undefined, LoginParamsType, {
   rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> }
}>('auth/login', async (param, thunkAPI) => {
   thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
   try {
      const res = await authAPI.login(param)
      if (res.data.resultCode === 0) {
         thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
      } else {
         handleServerAppError(res.data, thunkAPI.dispatch)
         return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
      }
   } catch (error) {
      // @ts-ignore
      handleServerNetworkError(error, thunkAPI.dispatch)
      // @ts-ignore
      return thunkAPI.rejectWithValue({error: [error.message], fieldsErrors: undefined})
   }
})

export const logoutTC = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
   thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
   try {
      const res = await authAPI.logout()
      if (res.data.resultCode === 0) {
         thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
      } else {
         handleServerAppError(res.data, thunkAPI.dispatch)
         return thunkAPI.rejectWithValue({})
      }
   } catch (error) {
      // @ts-ignore
      handleServerNetworkError(error, thunkAPI.dispatch)
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




