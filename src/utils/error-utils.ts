import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";
import {
   AppActionsType,
   setAppErrorAC,
   SetAppErrorActionType,
   setAppStatusAC,
   SetAppStatusActionType
} from "../app/app-reducer";

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
   dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
   dispatch(setAppStatusAC('failed'))
}

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
   if (data.messages.length) {
      dispatch(setAppErrorAC(data.messages[0]))
   } else {
      dispatch(setAppErrorAC('Some error occurred'))
   }
   dispatch(setAppStatusAC('failed'))
}