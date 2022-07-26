import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppInitialStateType = {
   // происходит ли сейчас взаимодействие с сервером
   status: RequestStatusType
   // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
   error: string | null
   isInitialized: boolean
}

const initialState: AppInitialStateType = {
   status: 'idle',
   error: null,
   isInitialized: false,
}

const slice = createSlice({
   name: 'app',
   initialState: initialState,
   reducers: {
      setAppStatusAC: (state, action: PayloadAction<{status: RequestStatusType }>) => {
         state.status = action.payload.status
      },
      setAppErrorAC: (state, action: PayloadAction<{error: string | null}>) => {
         state.error = action.payload.error
      },
      setInitializedAC: (state, action: PayloadAction<{isInitialized: boolean}>) => {
         state.isInitialized = action.payload.isInitialized
      }
   }
})

//Reducer
export const appReducer = slice.reducer

//AC
export const {setAppStatusAC, setAppErrorAC, setInitializedAC} = slice.actions

//THUNK
export const initializeAppTC = () => (dispatch: Dispatch) => {
   authAPI.me()
      .then(res => {
         if (res.data.resultCode === 0) {
            dispatch(setInitializedAC({isInitialized: true}))
            // dispatch(setIsLoggedInAC(true));
         } else {
            handleServerAppError(res.data, dispatch)
         }
      })
      .catch((error) => {
         handleServerNetworkError(error, dispatch)
      })
}