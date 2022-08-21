import {combineReducers} from "redux";
import {applicationReducer} from "../features/Application/application-reducer";
import {authReducer} from "../features/Auth";
import {tasksReducer, todolistsReducer} from "../features/TodolistsList";

export const rootReducer = combineReducers({
   tasks: tasksReducer,
   todolists: todolistsReducer,
   app: applicationReducer,
   auth: authReducer
})