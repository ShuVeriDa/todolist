// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
import {AnyAction, combineReducers} from 'redux';
import {tasksReducer} from "../features/TodolistsList/tasks-reducers";
import {todolistsReducer} from "../features/TodolistsList/todolists-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk'
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/Login/authReducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
   tasks: tasksReducer,
   todolists: todolistsReducer,
   app: appReducer,
   auth: authReducer
})
// непосредственно создаём store
export const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(thunkMiddleware)
});
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export type DispatchType  = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export const useAppDispatch = () => useDispatch<DispatchType>()

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;