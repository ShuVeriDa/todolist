import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {FieldErrorType} from "../api/types";
import {store} from "../app/store";
import {rootReducer} from "../app/reducers";

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export type DispatchType = typeof store.dispatch
export type ThunkError = { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }
