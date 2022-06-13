import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasksReducer";
import {todolistReducer} from "./todolistReducer";

export const rootReducerTest2  = combineReducers({
   tasks: tasksReducer,
   todolists: todolistReducer
})

export const store = createStore(rootReducerTest2)
export type AppRootStateType = ReturnType<typeof rootReducerTest2>