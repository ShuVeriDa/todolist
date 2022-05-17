// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducers";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducerWednesday} from "../Wednesday/state/tasks-reducers";
import {todolistsReducerWednesday} from "../Wednesday/state/todolists-reducer";

const rootReducer = combineReducers({
   tasks: tasksReducer,
   todolists: todolistsReducer,
})
// непосредственно создаём store
export const store = createStore(rootReducer);
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;