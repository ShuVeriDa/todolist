import {Dispatch} from 'redux'
import {authAPI, FieldErrorType, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAppStatusAC} from "../../app/app-reducer";
import {AxiosError} from "axios";

const initialState = {
   isLoggedIn: false
}

const slice = createSlice({
   name: 'auth',
   initialState: initialState,
   reducers: {
      setIsLoggedInAC: (state, action: PayloadAction<{ value: boolean }>) => {
         state.isLoggedIn = action.payload.value
      }
   },
   extraReducers: builder => {
      builder.addCase(loginTC.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
      })
   }

})

export const authReducer = slice.reducer
const setIsLoggedInAC = slice.actions.setIsLoggedInAC

// thunks
export const loginTC = createAsyncThunk<{isLoggedIn: boolean}, LoginParamsType, {
   rejectValue: {errors: Array<string>, fieldsErrors?: Array<FieldErrorType>}
}>('auth/login', async (param, thunkAPI) => {
   thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
   // try {
      const res = await authAPI.login(param)
      if (res.data.resultCode === 0) {
         thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
         return {isLoggedIn: true}
      } else {
         handleServerAppError(res.data, thunkAPI.dispatch)
         return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
      }
   // } catch (err) {
   //    const error: AxiosError = err
   //    handleServerNetworkError(error, thunkAPI.dispatch)
   //    return thunkAPI.rejectWithValue({error: [error.message], fieldsErrors: undefined})
   // }
})

export const logoutTC = () => (dispatch: Dispatch) => {
   dispatch(setAppStatusAC({status: 'loading'}))
   authAPI.logout()
      .then(res => {
         if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: false}))
            dispatch(setAppStatusAC({status: "succeeded"}))
         } else {
            handleServerAppError(res.data, dispatch)
         }
      })
      .catch((error) => {
         handleServerNetworkError(error, dispatch)
      })
}
