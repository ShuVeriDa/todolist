import {combineReducers} from "redux";
import {authReducer} from "../features/Auth";
import {tasksReducer, todolistsReducer} from "../features/TodolistsList";
import {appReducer} from "../features/Application";

export const rootReducer = combineReducers({
   app: appReducer,
   auth: authReducer,
   todolists: todolistsReducer,
   tasks: tasksReducer,
})