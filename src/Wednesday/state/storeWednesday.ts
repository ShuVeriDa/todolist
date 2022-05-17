import {combineReducers, createStore} from "redux";
import {tasksReducerWednesday} from "./tasks-reducers";
import {todolistsReducerWednesday} from "./todolists-reducer";


const rootReducer = combineReducers({
   tasks: tasksReducerWednesday,
   todolists: todolistsReducerWednesday,
})

export const store = createStore(rootReducer)

export type WednesdayAppRootStateType = ReturnType<typeof rootReducer>