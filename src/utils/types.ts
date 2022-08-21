import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {FieldErrorType} from "../api/types";
import {rootReducer, store} from "../app/store";

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export type DispatchType = typeof store.dispatch
export type ThunkError = { rejectValue: { error: string[], fieldsErrors?: FieldErrorType[] } }